import CryptoJS from 'crypto-js'

export interface DataEncryption {
  encode: <T>(input: T, secret?: string) => string
  decode: <T>(input: string, secret?: string) => T
}

export class CryptoJSAdapter implements DataEncryption {
  encode<T>(input: T, secret?: string): string {
    try {
      const jsonString = JSON.stringify(input)
      const secretKey = (secret ?? import.meta.env.VITE_SECRET_KEY) as string
      return CryptoJS.AES.encrypt(jsonString, secretKey).toString()
    } catch (error) {
      console.error('Error encoding data:', error)
      throw new Error('Failed to encode data')
    }
  }

  decode<T>(input: string, secret?: string): T {
    try {
      const secretKey = (secret ?? import.meta.env.VITE_SECRET_KEY) as string
      const decrypted = CryptoJS.AES.decrypt(input, secretKey)
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8)
      if (!jsonString) throw new Error('Invalid encrypted data or wrong secret')
      return JSON.parse(jsonString) as T
    } catch (error) {
      console.error('Error decoding data:', error)
      throw new Error('Failed to decode data')
    }
  }
}
