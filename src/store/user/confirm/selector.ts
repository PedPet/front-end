import { State } from "../../types";

export const confirmUserSubmitting = (state: State) =>
    state.user.confirm.submitting;

export const userConfirmed = (state: State) => state.user.confirm.success;
