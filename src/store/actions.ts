import { APIErrorAction } from "./types";

export const apiError = (error: string): APIErrorAction => ({
    type: "API_ERROR",
    error
});
