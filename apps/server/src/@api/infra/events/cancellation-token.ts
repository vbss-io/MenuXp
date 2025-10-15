export class CancellationToken {
  private _isCancelled = false

  cancel(): void {
    this._isCancelled = true
  }

  isCancelled(): boolean {
    return this._isCancelled
  }
}

export class CancellationTokenSource {
  private readonly tokens = new Map<string, CancellationToken>()

  createToken(taskId: string): CancellationToken {
    const token = new CancellationToken()
    this.tokens.set(taskId, token)
    return token
  }

  getToken(taskId: string): CancellationToken | undefined {
    return this.tokens.get(taskId)
  }

  cancelToken(taskId: string): void {
    const token = this.tokens.get(taskId)
    if (token) {
      token.cancel()
    }
  }
}
