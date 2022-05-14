import UserModel from "../models/users";
import { POINTS_BY_ACTION } from "../utils/constants";

/*  delivering points to the user by actions */
const addPointsToUser = async (points: Number, email: String) => {
  try {
    return await UserModel.findOneAndUpdate(email, { points });
  } catch (err) {
    throw err;
  }
};

export const signUpAction = async (email: String) => {
  try {
    const points = POINTS_BY_ACTION["signUp"];
    return await addPointsToUser(points, email);
  } catch (err) {
    throw err;
  }
};

export const firstLoginByDay = (email: String) => {
  try {
    const points = POINTS_BY_ACTION["firstLoginOfDay"];
  } catch (err) {
    throw err;
  }
};
