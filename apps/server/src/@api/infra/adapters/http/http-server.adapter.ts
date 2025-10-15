/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors'
import express, { type Application, type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import multer from 'multer'

import { HttpMethod } from '@api/domain/enums/http.enum'
import { NotFoundError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { AuthHandler } from '@api/infra/handlers/express-auth.handler'
import { ErrorHandler } from '@api/infra/handlers/express-error.handler'
import { HttpLoggerHandler } from '@api/infra/handlers/express-http-logger.handler'

export type CustomRequest = Request & { stripeEvent?: unknown }
type RequestParams = any
type Headers = Record<string, string | string[] | undefined>
type CallbackResponse = Promise<Record<string, any> | void>
type RouteAccess = 'isPublic' | 'isPrivate' | 'isAdmin' | 'isStripe'
export type StreamResponse = Response

export interface HttpServer {
  register: (
    method: HttpMethod,
    url: string,
    callback: (params?: RequestParams, headers?: Headers) => CallbackResponse,
    code?: number,
    access?: RouteAccess
  ) => void
  stream: (
    method: HttpMethod,
    url: string,
    callback: (res: Response, params: RequestParams, headers: Headers) => Promise<void>,
    access?: RouteAccess
  ) => void
  start: (port?: number) => void
}

export class ExpressAdapter implements HttpServer {
  @inject('ErrorHandler')
  private readonly ErrorHandler!: ErrorHandler

  @inject('AuthHandler')
  private readonly AuthHandler!: AuthHandler

  @inject('HttpLoggerHandler')
  private readonly HttpLoggerHandler!: HttpLoggerHandler

  @inject('Logger')
  private readonly Logger!: Logger

  private readonly app: Application

  constructor() {
    this.app = express()
    this.app.use(cors())
    this.app.use((req, res, next) => {
      if (req.path.startsWith('/webhooks')) return next()
      express.json()(req, res, next)
    })
    this.app.use(multer().array('files'))
    this.app.use(this.HttpLoggerHandler.handle.bind(this.HttpLoggerHandler))
  }

  register(
    method: HttpMethod,
    url: string,
    callback: (params?: RequestParams, headers?: Headers) => CallbackResponse,
    code = 200,
    access: RouteAccess = 'isPrivate'
  ): void {
    const handler: RequestHandler = async (req: CustomRequest, res: Response) => {
      const output = await callback(
        {
          ...req.params,
          ...req.query,
          ...req.body,
          files: req.files,
          stripeEvent: req.stripeEvent
        },
        req.headers
      )
      res.status(code).json(output)
    }
    if (access === 'isPublic') {
      this.app[method](url, handler)
    } else if (access === 'isAdmin') {
      this.app[method](
        url,
        this.AuthHandler.handle.bind(this.AuthHandler),
        this.AuthHandler.handleAdmin.bind(this.AuthHandler),
        handler
      )
    } else if (access === 'isStripe') {
      this.app[method](
        url,
        express.raw({ type: 'application/json' }),
        this.AuthHandler.handleStripe.bind(this.AuthHandler),
        handler
      )
    } else {
      this.app[method](url, this.AuthHandler.handle.bind(this.AuthHandler), handler)
    }
  }

  stream(
    method: HttpMethod,
    url: string,
    callback: (res: Response, params: RequestParams, headers: Headers) => Promise<void>,
    access: RouteAccess = 'isPrivate'
  ): void {
    const handler: RequestHandler = async (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
      res.setHeader('Transfer-Encoding', 'chunked')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')
      await callback(res, { ...req.params, ...req.query, ...req.body }, req.headers)
    }
    if (access === 'isPublic') {
      this.app[method](url, handler)
    } else {
      this.app[method](url, this.AuthHandler.handle.bind(this.AuthHandler), handler)
    }
  }

  start(port?: number): void {
    this.app.use(() => {
      throw new NotFoundError('Not Found')
    })
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      this.ErrorHandler.handle(err, req, res, next)
    })
    this.app.listen(port, () => {
      this.Logger.info(`Server started on PORT ${port}`)
    })
  }
}
