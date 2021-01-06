import { Response } from 'express'
import { AccessTokenErrorResponse, AuthFailureResponse, BadRequestResponse, InternalErrorResponse, ForbiddenResponse } from './apiResponse'

enum ErrorType {
    BAD_REQUEST = 'BadRequestError',
    UNAUTHORIZED = 'AuthFailureError',
    Internal = 'InternalError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    BAD_TOKEN = 'BadTokenError',
    ACCESS_TOKEN = 'AccessTokenError',
    FORBIDDEN = 'ForbiddenError',
}

export abstract class ApiError extends Error {

    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
    }
    public static handle(err: ApiError, res: Response): Response {
        console.log("CASE " + err.type)
        switch (err.type) {
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.UNAUTHORIZED:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.BAD_TOKEN:

                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.Internal:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                console.log("CASE " + ErrorType.ACCESS_TOKEN)
                return new AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                return new InternalErrorResponse(err.message).send(res);
            }
        }
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        console.log("BadRequestError " + message)
        super(ErrorType.BAD_REQUEST, message);

    }
}

export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid credentials') {
        super(ErrorType.UNAUTHORIZED, message)
    }
}

export class InternalError extends ApiError {
    constructor(message = 'Internal Error') {
        super(ErrorType.Internal, message);
    }
}

export class TokenExpiredError extends ApiError {
    constructor(message = 'Token is Expired') {
        super(ErrorType.TOKEN_EXPIRED, message)
    }
}

export class BadTokenError extends ApiError {
    constructor(message = 'Token is not Valid') {
        console.log("CAlled Bad Token Error")
        super(ErrorType.BAD_TOKEN, message)
    }
}

export class AccessTokenError extends ApiError {
    constructor(message = 'Invalid Access token ') {
        super(ErrorType.ACCESS_TOKEN, message)
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
      super(ErrorType.FORBIDDEN, message);
    }
  }