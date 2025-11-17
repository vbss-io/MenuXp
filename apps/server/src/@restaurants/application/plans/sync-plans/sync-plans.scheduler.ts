import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { SyncPlansUsecase } from '@restaurants/application/plans/sync-plans/sync-plans.usecase'

const NIGHTLY_SYNC_HOUR = 0
const NIGHTLY_SYNC_MINUTE = 0
const STALE_THRESHOLD_MS = 24 * 60 * 60 * 1000
const CACHE_KEY_LAST_SYNC = 'plan_catalog:last_sync_timestamp'
const CACHE_TTL_NEVER_EXPIRE = 365 * 24 * 60 * 60 * 1000

export class SyncPlansScheduler {
  @inject('SyncPlansUsecase')
  private readonly syncPlansUsecase!: SyncPlansUsecase

  @inject('Logger')
  private readonly logger!: Logger

  @inject('Cache')
  private readonly cache!: Cache

  private intervalId?: NodeJS.Timeout

  start(): void {
    this.logger.info('Starting plan catalog sync scheduler')
    this.scheduleNextSync()
  }

  stop(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = undefined
      this.logger.info('Plan catalog sync scheduler stopped')
    }
  }

  private scheduleNextSync(): void {
    const now = new Date()
    const nextSync = this.calculateNextSyncTime(now)
    const delayMs = nextSync.getTime() - now.getTime()
    this.logger.info(`Next plan catalog sync scheduled for ${nextSync.toISOString()}`)
    this.intervalId = setTimeout(() => {
      void this.executeSyncAndReschedule()
    }, delayMs)
  }

  private async executeSyncAndReschedule(): Promise<void> {
    const startTime = Date.now()
    try {
      this.logger.info('Executing scheduled plan catalog sync')
      const result = await this.syncPlansUsecase.execute()
      const duration = Date.now() - startTime
      const timestamp = Date.now()
      this.cache.set(CACHE_KEY_LAST_SYNC, timestamp, CACHE_TTL_NEVER_EXPIRE)
      if (result.success) {
        this.logger.info('Scheduled plan catalog sync completed successfully', {
          synced: result.synced,
          failed: result.failed,
          durationMs: duration
        })
      } else {
        this.logger.error('Scheduled plan catalog sync completed with errors', {
          synced: result.synced,
          failed: result.failed,
          errors: result.errors,
          durationMs: duration
        })
      }
    } catch (error) {
      this.logger.error('Scheduled plan catalog sync failed', { error })
    } finally {
      this.scheduleNextSync()
    }
  }

  private calculateNextSyncTime(from: Date): Date {
    const next = new Date(from)
    next.setHours(NIGHTLY_SYNC_HOUR, NIGHTLY_SYNC_MINUTE, 0, 0)
    if (next <= from) {
      next.setDate(next.getDate() + 1)
    }
    return next
  }

  async triggerManualSync(): Promise<void> {
    this.logger.info('Manual plan catalog sync triggered')
    await this.executeSyncAndReschedule()
  }

  getLastSyncTimestamp(): number | null {
    return this.cache.get<number>(CACHE_KEY_LAST_SYNC)
  }

  isStale(): boolean {
    const lastSync = this.getLastSyncTimestamp()
    if (!lastSync) {
      this.logger.warn('Plan catalog sync has never run')
      return true
    }
    const now = Date.now()
    const isStale = now - lastSync > STALE_THRESHOLD_MS
    if (isStale) {
      const hoursSinceLastSync = Math.floor((now - lastSync) / (60 * 60 * 1000))
      this.logger.warn('Plan catalog sync is stale', {
        lastSyncTimestamp: new Date(lastSync).toISOString(),
        hoursSinceLastSync
      })
    }
    return isStale
  }

  getHealthStatus(): PlanSyncHealthStatus {
    const lastSync = this.getLastSyncTimestamp()
    const isStale = this.isStale()
    return {
      healthy: !isStale,
      lastSyncTimestamp: lastSync ? new Date(lastSync).toISOString() : null,
      isStale,
      nextScheduledSync: this.calculateNextSyncTime(new Date()).toISOString()
    }
  }
}

export interface PlanSyncHealthStatus {
  healthy: boolean
  lastSyncTimestamp: string | null
  isStale: boolean
  nextScheduledSync: string
}
