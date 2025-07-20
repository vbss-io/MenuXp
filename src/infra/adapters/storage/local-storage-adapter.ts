import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'
import type { DataEncryption } from '@/infra/adapters/auth/cripto-js-adapter'

export class LocalStorageAdapter implements LocalStorage {
  private readonly dataEncryption: DataEncryption

  constructor() {
    this.dataEncryption = Registry.getInstance().inject('dataEncryption') as DataEncryption
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null
    try {
      const decryptedValue = this.dataEncryption.decode<T>(item)
      return decryptedValue
    } catch {
      try {
        const parsed = JSON.parse(item)
        return parsed as T
      } catch {
        return item as unknown as T
      }
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const encryptedValue = this.dataEncryption.encode(value)
      localStorage.setItem(key, encryptedValue)
    } catch (error) {
      console.error('Error encrypting data for localStorage:', error)
      if (typeof value === 'string') {
        localStorage.setItem(key, value)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
