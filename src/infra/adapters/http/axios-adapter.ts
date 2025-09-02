import axios from 'axios'

import {
  type HttpClient,
  type HttpClientGetInput,
  type HttpClientPostInput,
  type HttpClientResponse
} from '@/domain/http/http-client'

axios.defaults.validateStatus = function (): boolean {
  return true
}

export class LogoutError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class AxiosAdapter implements HttpClient {
  async get<T>({ url, params = {}, headers = {}, responseType }: HttpClientGetInput): Promise<HttpClientResponse<T>> {
    const options = { params, headers }
    if (responseType) Object.assign(options, { responseType })
    const response = await axios.get(url, options)
    this.checkStatus<T>(response)
    return response
  }

  async post<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await axios.post(url, body, { params, headers })
    this.checkStatus<T>(response)
    return response
  }

  async put<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await axios.put(url, body, { params, headers })
    this.checkStatus<T>(response)
    return response
  }

  async patch<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await axios.patch(url, body, { params, headers })
    this.checkStatus<T>(response)
    return response
  }

  async delete<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await axios.delete(url, { data: body, params, headers })
    this.checkStatus<T>(response)
    return response
  }

  checkStatus<T>(response: HttpClientResponse<T>): void {
    const message = (response.data as { message?: string })?.message ?? 'An error occurred'
    if (response.status === 401) {
      throw new LogoutError(message)
    }
    if (response.status >= 400) {
      throw new Error(message)
    }
  }
}
