import axios from "axios";
import { BASE_API_URL } from "../utils/utils";

export enum ResponseError {
    AUTHORIZATION = 1,
    AUTH_TOKEN_NOT_FOUND = 2,
    
    HAS_ALREADY_ACC = 1000,
    PASSWORD_INCORRECT = 1001,
    LOGIN_FAILED = 1002,
    LOGIN_FAILED_HAS_NOT_ACC = 1003,
    
    ACTIVATION_CODE_BANNED = 1004,
    WRONG_CONFIRMATION_CODE = 1005,
    
    ACC_NOT_ACTIVE = 1006,
}

const api = axios.create({
    baseURL: BASE_API_URL
});

export default api;