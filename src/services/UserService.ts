import { requestBackend } from "../utils/requests";
import * as authService from './AuthService'

export function findMe() {
    const headers = {
        Authorization: "Bearer " + authService.getAccessToken()
    }

    console.log(headers)
    return requestBackend({ url: `/users/me`, headers });
}