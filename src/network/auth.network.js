import {publicRequest} from '../config/axios.config'

export const login = async (data) => {
    return await publicRequest.post(`/login`, data);
};
export const Register = async (data) => {
    return await publicRequest.post(`/register`, data);
};