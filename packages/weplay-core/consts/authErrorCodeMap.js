export const emailAlreadyExistsCode = 5008
export const emailAlreadyExistsCode2 = 5020
export const authErrorCodeMap = {
  5004: 'Invalid user credentials.',
  5007: 'Not found email',
  [emailAlreadyExistsCode]: 'emailAlreadyExists',
  [emailAlreadyExistsCode2]: 'emailAlreadyExists', // not sure
  5009: 'User banned',
  5015: 'passwordAlreadyUsed',
  5016: 'Code expired',
  5017: 'Invalid code',
  5019: 'Nick already exists',
  5026: 'emailInvalid',
}
