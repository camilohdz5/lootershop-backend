// Vendors
import { Request, Response } from "express";
import { ZodError } from "zod";

// Utils
import { OK, INTERNAL_ERROR, CREATED, BAD_REQUEST } from "../utils/apiResponse";
import { signUpFormSchema, loginFormSchema } from "../utils/zodSchemas/users";

// Services
import {
  findUserByEmail,
  createUser,
  encryptPassword,
  comparePassword,
  signSessionToken,
} from "../services/auth";
import { signUpAction } from "../services/loyalty";

export const ping = (req: Request, res: Response): Response => {
  return OK(
    res,
    {
      ip: req.socket.remoteAddress,
    },
    "Hello From auth Services"
  );
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload = req.body;
    signUpFormSchema.parse(payload);

    const data = await encryptPassword(payload);

    const userCreated = await createUser(data);

    // adding loyalty points
    await signUpAction(userCreated.email);

    return CREATED(res, { payload: userCreated }, "User Created correctly");
  } catch (err) {
    if (err instanceof ZodError) {
      return BAD_REQUEST(
        res,
        err.issues.map((issue) => ({ messsage: issue.message })),
        "The data what you sent is wrong"
      );
    }
    return INTERNAL_ERROR(
      res,
      { payload: err },
      "something wrong creating the user"
    );
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload = req.body;
    loginFormSchema.parse(payload);

    const user = await findUserByEmail(payload.email);
    if (!user) throw new Error("User or password invalid");

    const isEqual = await comparePassword(payload.password, user.password);
    if (!isEqual) throw new Error("User or password invalid");

    const token = signSessionToken(user);

    return OK(
      res,
      { message: `Welcome ${user.nickname}`, token },
      "Access Granted"
    );
  } catch (err: any) {
    if (err instanceof ZodError) {
      return BAD_REQUEST(
        res,
        err.issues.map((issue) => ({ messsage: issue.message })),
        "The data what you sent is wrong"
      );
    }
    return INTERNAL_ERROR(
      res,
      { data: err.message },
      "something wrong trying to login"
    );
  }
};
