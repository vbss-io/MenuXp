import axios from 'axios'

type Headers = Record<string, string | string[] | undefined>
type RequestParams = unknown
type RequestBody = unknown

export interface HttpClientGetInput {
  url: string
  params?: RequestParams
  headers?: Headers
  responseType?: string
}

export interface HttpClientPostInput {
  url: string
  body: RequestBody
  params?: RequestParams
  headers?: Headers
}

export interface HttpClient {
  get: <T>({ url, params, headers, responseType }: HttpClientGetInput) => Promise<T>
  post: <T>({ url, body, params, headers }: HttpClientPostInput) => Promise<T>
  put: <T>({ url, body, params, headers }: HttpClientPostInput) => Promise<T>
  patch: <T>({ url, body, params, headers }: HttpClientPostInput) => Promise<T>
  delete: <T>({ url, params, headers }: HttpClientGetInput) => Promise<T>
  streamPost: ({ url, body, params, headers }: HttpClientPostInput) => Promise<unknown>
}

axios.defaults.validateStatus = function (): boolean {
  return true
}

export class AxiosAdapter implements HttpClient {
  async get<T>({ url, params = {}, headers = {}, responseType }: HttpClientGetInput): Promise<T> {
    const options = { params, headers }
    if (responseType) Object.assign(options, { responseType })
    const response = await axios.get(url, options)
    return response.data as T
  }

  async post<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<T> {
    const response = await axios.post(url, body, { params, headers })
    return response.data as T
  }

  async put<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<T> {
    const response = await axios.put(url, body, { params, headers })
    return response.data as T
  }

  async patch<T>({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<T> {
    const response = await axios.patch(url, body, { params, headers })
    return response.data as T
  }

  async delete<T>({ url, params = {}, headers = {} }: HttpClientGetInput): Promise<T> {
    const response = await axios.delete(url, { params, headers })
    return response.data as T
  }

  async streamPost({ url, body, params = {}, headers = {} }: HttpClientPostInput): Promise<unknown> {
    const response = await axios.post(url, body, { params, headers, responseType: 'stream' })
    return response
  }
}
