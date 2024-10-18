import { Request, Response, NextFunction } from "express";

export interface IRequestUser {
  email: string;
  id: string;
}

/**
 * Extending Request(from express) to be able to attach user id & email when decoding the token.
 */
export interface IRequest extends Request {
  user: IRequestUser;
}

export type IResponse = Response;
export type INextFunction = NextFunction;
