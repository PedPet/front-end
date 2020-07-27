import { State } from "./types";

export const apiErrorSelector = (state: State): string => state.api.error;
