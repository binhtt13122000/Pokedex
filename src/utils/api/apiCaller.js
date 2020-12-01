import Axios from 'axios';
import {ROOT_API_URL} from '../constants/api.constants'
export const defaultHeader = {
    "Content-Type" : "application/json",
}

export const request = (endpoint, method, headers, body, params) => {
    return Axios(
        {
            url: ROOT_API_URL + endpoint,
            method: method,
            headers: {...defaultHeader, ...headers},
            data: body,
            params: Object.assign(params),
            withCredentials: true,
        }
    )
}

export const get = (endpoint, headers = {}, params = {}) => {
    return request(endpoint, "GET", headers, null, params)
}

export const post = (endpoint, headers = {}, body = {},params = {}) => {
    return request(endpoint, "POST", headers, body, params)
}

export const put = (endpoint, headers = {}, body = {},params = {}) => {
    return request(endpoint, "PUT", headers, body, params)
}

export const remove = (endpoint, headers = {}, body = {},params = {}) => {
    return request(endpoint, "DELETE", headers, body, params)
}