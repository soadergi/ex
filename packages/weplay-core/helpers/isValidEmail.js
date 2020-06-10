// Validations
import EmailValidator from 'email-validator'

export const isValidEmail = email => EmailValidator.validate(email)
