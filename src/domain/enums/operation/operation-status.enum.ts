export enum OperationStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished'
}

export const operationStatus = Object.values(OperationStatus)
