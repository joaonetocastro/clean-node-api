import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { InvalidParamError } from '../errors/InvalidParamError'
import { MissingParamError } from '../errors/MissingParamError'
import { ServerError } from '../errors/ServerError'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
    return {
      statusCode: 200,
      body: {}
    }
  }
}
