import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { ZodAdapter } from '@api/infra/adapters/validate/validate.adapter'
import { inject, Registry } from '@api/infra/dependency-injection/registry'
import { AuthListenersController } from '@restaurants/application/auth/@listeners/auth-listeners.controller'
import { ResetPasswordRequestedListener } from '@restaurants/application/auth/@listeners/reset-password-requested.listener'
import { UserRegisteredListener } from '@restaurants/application/auth/@listeners/user-registered.listener'
import { ForgotPasswordController } from '@restaurants/application/auth/forgot-password/forgot-password.controller'
import { ForgotPasswordSchema } from '@restaurants/application/auth/forgot-password/forgot-password.schema'
import { ForgotPasswordUsecase } from '@restaurants/application/auth/forgot-password/forgot-password.usecase'
import { LoginUserController } from '@restaurants/application/auth/login-user/login-user.controller'
import { LoginUserSchema } from '@restaurants/application/auth/login-user/login-user.schema'
import { LoginUserUsecase } from '@restaurants/application/auth/login-user/login-user.usecase'
import { RegisterUserController } from '@restaurants/application/auth/register-user/register-user.controller'
import { RegisterUserSchema } from '@restaurants/application/auth/register-user/register-user.schema'
import { RegisterUserUsecase } from '@restaurants/application/auth/register-user/register-user.usecase'
import { ResentEmailConfirmationController } from '@restaurants/application/auth/resent-email-confirmation/resent-email-confirmation.controller'
import { ResentEmailConfirmationSchema } from '@restaurants/application/auth/resent-email-confirmation/resent-email-confirmation.schema'
import { ResentConfirmationUsecase } from '@restaurants/application/auth/resent-email-confirmation/resent-email-confirmation.usecase'
import { ResetPasswordController } from '@restaurants/application/auth/reset-password/reset-password.controller'
import { ResetPasswordSchema } from '@restaurants/application/auth/reset-password/reset-password.schema'
import { ResetPasswordUsecase } from '@restaurants/application/auth/reset-password/reset-password.usecase'
import { UpdatePasswordController } from '@restaurants/application/auth/update-password/update-password.controller'
import { UpdatePasswordSchema } from '@restaurants/application/auth/update-password/update-password.schema'
import { VerifyEmailController } from '@restaurants/application/auth/verify-email/verify-email.controller'
import { VerifyEmailUsecase } from '@restaurants/application/auth/verify-email/verify-email.usecase'
import { RESET_PASSWORD_REQUESTED, USER_REGISTERED } from '@restaurants/domain/auth/consts/auth-events.const'
import { UpdatePasswordUsecase } from './update-password/update-password.usecase'

export class AuthModule {
  @inject('Queue')
  private readonly Queue!: Queue

  constructor() {
    const registry = Registry.getInstance()

    void this.Queue.register(USER_REGISTERED.eventName, USER_REGISTERED.consume)
    void this.Queue.register(RESET_PASSWORD_REQUESTED.eventName, RESET_PASSWORD_REQUESTED.consume)

    registry.provide('UserRegisteredListener', new UserRegisteredListener())
    registry.provide('ResetPasswordRequestedListener', new ResetPasswordRequestedListener())
    new AuthListenersController()

    registry.provide('ForgotPasswordValidate', new ZodAdapter(ForgotPasswordSchema))
    registry.provide('ForgotPasswordUsecase', new ForgotPasswordUsecase())
    new ForgotPasswordController()

    registry.provide('LoginUserValidate', new ZodAdapter(LoginUserSchema))
    registry.provide('LoginUserUsecase', new LoginUserUsecase())
    new LoginUserController()

    registry.provide('RegisterUserValidate', new ZodAdapter(RegisterUserSchema))
    registry.provide('RegisterUserUsecase', new RegisterUserUsecase())
    new RegisterUserController()

    registry.provide('ResentEmailConfirmationValidate', new ZodAdapter(ResentEmailConfirmationSchema))
    registry.provide('ResentEmailConfirmationUsecase', new ResentConfirmationUsecase())
    new ResentEmailConfirmationController()

    registry.provide('ResetPasswordValidate', new ZodAdapter(ResetPasswordSchema))
    registry.provide('ResetPasswordUsecase', new ResetPasswordUsecase())
    new ResetPasswordController()

    registry.provide('UpdatePasswordValidate', new ZodAdapter(UpdatePasswordSchema))
    registry.provide('UpdatePasswordUsecase', new UpdatePasswordUsecase())
    new UpdatePasswordController()

    registry.provide('VerifyEmailUsecase', new VerifyEmailUsecase())
    new VerifyEmailController()
  }
}
