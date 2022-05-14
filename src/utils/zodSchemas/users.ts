import { z } from "zod";

export const signUpFormSchema = z.object({
  nickname: z.string().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  birthday: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  favoriteGames: z.array(z.string()).nonempty(), // TODO: add as a optional
});

export const loginFormSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
