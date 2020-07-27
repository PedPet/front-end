import { State } from "../types";

export const registerIsSubmitting = (state: State): boolean =>
    state.register.submitting;

export const registerSuccess = (state: State): boolean =>
    state.register.success;
