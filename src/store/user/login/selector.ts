import { State } from "../../types";
import { User } from "../types";

export const checkLoginSubmitting = (state: State): boolean =>
    state.user.login.submitting;

export const loggedInUser = (state: State): User | undefined =>
    state.user.login.user;
