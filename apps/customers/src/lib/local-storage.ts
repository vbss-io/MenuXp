import CryptoJS from 'crypto-js'

import type { Language } from '@/components/ui/language-selector'
import type { Cart } from '@/types/cart'
import type { Client } from '@/types/client'
import type { Restaurant, RestaurantConfigValidation } from '@/types/restaurant'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string

function encryptData(data: unknown): string {
  const jsonString = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString()
}

function decryptData(encryptedData: string): unknown {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedString)
  } catch (error) {
    console.error('Erro ao descriptografar dados do localStorage:', error)
    return null
  }
}

export interface LocalStorageManager {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  clear(): void
  has(key: string): boolean
}

class SecureLocalStorage implements LocalStorageManager {
  get<T>(key: string): T | null {
    try {
      const encryptedData = localStorage.getItem(key)
      if (!encryptedData) return null
      return decryptData(encryptedData) as T | null
    } catch (error) {
      console.error(`Erro ao recuperar dados do localStorage para a chave "${key}":`, error)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const encryptedData = encryptData(value)
      localStorage.setItem(key, encryptedData)
    } catch (error) {
      console.error(`Erro ao salvar dados no localStorage para a chave "${key}":`, error)
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Erro ao remover dados do localStorage para a chave "${key}":`, error)
    }
  }

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
    }
  }

  has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null
    } catch (error) {
      console.error(`Erro ao verificar existência da chave "${key}" no localStorage:`, error)
      return false
    }
  }
}

export const secureStorage = new SecureLocalStorage()

export const STORAGE_KEYS = {
  CLIENT: 'client',
  RESTAURANT: 'restaurant',
  OPERATION_ID: 'operationId',
  RESTAURANT_CONFIG_VALIDATION: 'restaurantConfigValidation',
  CART: 'cart',
  USER_PREFERENCES: 'userPreferences',
  LANGUAGE: 'language',
  SESSION: 'session'
} as const

export const storageUtils = {
  language: {
    get: () => secureStorage.get(STORAGE_KEYS.LANGUAGE),
    set: (language: Language) => secureStorage.set(STORAGE_KEYS.LANGUAGE, language),
    remove: () => secureStorage.remove(STORAGE_KEYS.LANGUAGE),
    has: () => secureStorage.has(STORAGE_KEYS.LANGUAGE)
  },
  client: {
    get: () => secureStorage.get(STORAGE_KEYS.CLIENT),
    set: (client: Client) => secureStorage.set(STORAGE_KEYS.CLIENT, client),
    remove: () => secureStorage.remove(STORAGE_KEYS.CLIENT),
    has: () => secureStorage.has(STORAGE_KEYS.CLIENT)
  },
  restaurant: {
    get: () => secureStorage.get(STORAGE_KEYS.RESTAURANT),
    set: (restaurant: Restaurant) => secureStorage.set(STORAGE_KEYS.RESTAURANT, restaurant),
    remove: () => secureStorage.remove(STORAGE_KEYS.RESTAURANT),
    has: () => secureStorage.has(STORAGE_KEYS.RESTAURANT)
  },
  operation: {
    get: () => secureStorage.get(STORAGE_KEYS.OPERATION_ID),
    set: (operationId: string) => secureStorage.set(STORAGE_KEYS.OPERATION_ID, operationId),
    remove: () => secureStorage.remove(STORAGE_KEYS.OPERATION_ID),
    has: () => secureStorage.has(STORAGE_KEYS.OPERATION_ID)
  },
  configValidation: {
    get: () => secureStorage.get(STORAGE_KEYS.RESTAURANT_CONFIG_VALIDATION),
    set: (validation: RestaurantConfigValidation) =>
      secureStorage.set(STORAGE_KEYS.RESTAURANT_CONFIG_VALIDATION, validation),
    remove: () => secureStorage.remove(STORAGE_KEYS.RESTAURANT_CONFIG_VALIDATION),
    has: () => secureStorage.has(STORAGE_KEYS.RESTAURANT_CONFIG_VALIDATION)
  },
  cart: {
    get: () => secureStorage.get(STORAGE_KEYS.CART),
    set: (cart: Cart) => secureStorage.set(STORAGE_KEYS.CART, cart),
    remove: () => secureStorage.remove(STORAGE_KEYS.CART),
    has: () => secureStorage.has(STORAGE_KEYS.CART)
  },
  session: {
    get: () => secureStorage.get(STORAGE_KEYS.SESSION),
    set: (session: string) => secureStorage.set(STORAGE_KEYS.SESSION, session),
    remove: () => secureStorage.remove(STORAGE_KEYS.SESSION),
    has: () => secureStorage.has(STORAGE_KEYS.SESSION)
  }
}
