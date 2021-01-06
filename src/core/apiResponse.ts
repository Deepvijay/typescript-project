import { Response } from 'express';
enum StatusCode {
    SUCCESS = '10000',
    FAILURE = '10001',
    RETRY = '10002',
    INVALID_ACCESS_TOKEN = '10003',
}

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
    constructor(protected statusCode: StatusCode, protected status: ResponseStatus, protected message: string) {

    }
    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        // console.log(res.status(this.status).json(ApiResponse.sanitize(response)))
        return res.status(this.status).json(ApiResponse.sanitize(response))
    }

    public send(res: Response): Response {
        console.log("send")
        return this.prepare<ApiResponse>(res, this);
    }


    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone
    }
}



export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message)
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}

export class SuccessReponse<T> extends ApiResponse{
    constructor(message:string,private data:T){
        super(StatusCode.SUCCESS,ResponseStatus.SUCCESS,message)
    }
    send(res:Response):Response{
        // return super.prepare<SuccessResponse<T>>(res, this);
        return super.prepare<SuccessReponse<T>>(res,this);
    }
}

export class AuthFailureResponse extends ApiResponse{
    constructor(message ='Authentication Fail'){
        super(StatusCode.FAILURE,ResponseStatus.UNAUTHORIZED,message)
    }
}

export class AccessTokenErrorResponse extends ApiResponse{
    private instruction ='refresh Token';
    constructor(message="acces token invalid"){
        super(StatusCode.INVALID_ACCESS_TOKEN,ResponseStatus.UNAUTHORIZED, message)
    }
    send(res:Response):Response{
        res.setHeader('instruction', this.instruction);
        return super.prepare<AccessTokenErrorResponse>(res,this)
    }
}
export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
      super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
  }
  