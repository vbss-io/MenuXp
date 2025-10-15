import { HttpClient } from '@api/infra/adapters/http/http-client.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export type CustomFile = File & {
  buffer: Buffer
  mimetype: string
  originalname: string
}

export interface FileConverter {
  fileToBase64(file: CustomFile): string
  urlToBase64(url: string): Promise<string>
}

export class FileConverterService implements FileConverter {
  @inject('HttpClient')
  private readonly HttpClient!: HttpClient

  fileToBase64(file: CustomFile): string {
    return file.buffer.toString('base64')
  }

  async urlToBase64(imageUrl: string): Promise<string> {
    const arrayBuffer = await this.HttpClient.get({
      url: imageUrl,
      responseType: 'arraybuffer'
    })
    const base64 = Buffer.from(arrayBuffer as string, 'binary').toString('base64')
    return base64
  }
}
