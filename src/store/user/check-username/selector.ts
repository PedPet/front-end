import { State } from "../../types";

export const checkUsernameFetching = (state: State): boolean =>
    state.user.checkUsername.fetching

export const checkUsernameIsTaken = (state: State): boolean | undefined =>
    state.user.checkUsername.taken;
