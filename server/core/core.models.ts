import { Request, Response, NextFunction } from "express";

/**
 * Extending Request(from express) to be able to attach user id & email when decoding the token.
 */
export interface IRequest extends Request {
  user: {
    email: string;
    id: string;
  };
}

export type IResponse = Response;
export type INextFunction = NextFunction;
