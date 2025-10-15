export const USER_REGISTERED = {
  eventName: 'userRegistered',
  consume: 'userRegistered.sendConfirmationEmail'
}

export const RESET_PASSWORD_REQUESTED = {
  eventName: 'resetPasswordRequested',
  consume: 'resetPasswordRequested.sendResetPasswordEmail'
}

export const USER_STATUS_NON_ACTIVE_UPDATED = {
  eventName: 'userStatusNonActiveUpdated'
}
