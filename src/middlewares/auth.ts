import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, INTERNAL_ERROR, FORBIDDEN } from "../utils/apiResponse";
import { JsonWebTokenError } from 'jsonwebtoken'
import {
  findUserByEmail,
  findUserByNickname,
  validateSessionToken,
} from "../services/auth";

export const checkUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email } = req.body;
    const emailExist = await findUserByEmail(email);

    if (emailExist) {
      return BAD_REQUEST(res, { message: "Email is already regsitered" });
    }
    next();
  } catch (err) {
    return INTERNAL_ERROR(res, {}, "Internal Servver Error");
  }
};

export const checkUniqueUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { nickname } = req.body;
    const usernameExist = await findUserByNickname(nickname);

    if (usernameExist) {
      return BAD_REQUEST(res, { message: "Nickname is already regsitered" });
    }

    next();
  } catch (err) {
    return INTERNAL_ERROR(res, {}, "Internal Server Error");
  }
};

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  try {
    const token = req.headers["x-lootershop-token"];

    if (!token) {
      return BAD_REQUEST(res, { message: "no Token Provided" });
    }

    //TODO: Verify  how to type the header
    validateSessionToken(token);

    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return FORBIDDEN(res,  { payload: err }, 'Access Restricted')
    }
    return INTERNAL_ERROR(res, { payload: err }, "Internal Server Error");
  }
};
