import { APIErrorAction } from "./types";

export const apiError = (
    error: string = "Sorry, something went wrong",
): APIErrorAction => ({
    type: "API_ERROR",
    error,
});
