import { storageUtils } from '@/lib/local-storage'

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getSessionId = (): string => {
  try {
    let sessionId = storageUtils.session.get()
    if (!sessionId) {
      sessionId = generateUUID()
      storageUtils.session.set(sessionId as string)
    }
    return sessionId as string
  } catch (error) {
    console.error('Error managing sessionId:', error)
    return generateUUID()
  }
}

export const clearSessionId = (): void => {
  try {
    storageUtils.session.remove()
  } catch (error) {
    console.error('Error clearing sessionId:', error)
  }
}

export const hasSessionId = (): boolean => {
  try {
    return !!storageUtils.session.has()
  } catch {
    return false
  }
}
