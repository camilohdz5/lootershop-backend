import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "../models/users";

const PRIVATE_KEY: Secret = "asdsdwefgereea"; //TODO: put this on the .env

// TODO: remove anytypes (creating moongose types) for all methods here (params and returns)
export const createUser = async (payload: any) => {
  try {
    const newUser = new UserModel(payload);

    return await newUser.save();
  } catch (err) {
    throw err;
  }
};

export const findUserByEmail = async (email: String) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
};

export const findUserByNickname = async (nickname: String) => {
  try {
    const user = await UserModel.findOne({ nickname });
    return user;
  } catch (err) {
    throw err;
  }
};

export const encryptPassword = async (payload: any) => {
  try {
    const { password } = payload;

    const saltRounds = 10; //TODO: Define as a Global Constant

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const data = { ...payload, password: encryptedPassword };

    return data;
  } catch (err) {
    throw err;
  }
};

export const comparePassword = async (entry: string, currentHash: string) => {
  try {
    const isEqual = await bcrypt.compare(entry, currentHash);

    return isEqual;
  } catch (err) {
    throw err;
  }
};

export const signSessionToken = (data: any) => {
  try {
    const payload = {
      tokenOwner: data.nickname,
      email: data.email,
      emailVerified: data.verified,
    };

    // Expires in 2 hours
    const token = jwt.sign(payload, PRIVATE_KEY, {
      expiresIn: Math.floor(Date.now() / 1000) + 120 * 120,
    });

    return token;
  } catch (err) {
    throw err;
  }
};

export const validateSessionToken = (token: any) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (err) {
    throw err;
  }
};
