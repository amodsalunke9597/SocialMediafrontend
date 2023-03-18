import axios from "axios";

import {
    getItem,
    KEY_ACCESS_TOKEN,
    removeItem,
    setItem,
} from "./localStorageManager";

import store from '../redux/store';
import { TOAST_SUCCESS } from "../App";
import { TOAST_FAILURE } from "../App";
import { setLoading,showToast } from "../redux/slices/appConfigSlice";

let baseURL = process.env.REACT_APP_SERVER_BASE_URL;

export const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
});



axiosClient.interceptors.request.use( (request) => {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        store.dispatch(setLoading(true));

        return request;

    }


)

axiosClient.interceptors.response.use( async (response) => {
    store.dispatch(setLoading(false));
    const data = response.data;
    if(data.status === 'ok'){
        return data;
    }
    
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.message;

    store.dispatch(showToast({
        type: TOAST_FAILURE,
        message: error
    }))

    //when refresh token expires send him to login page
    if(statusCode === 401 &&
    // originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`){
    originalRequest.url === `${baseURL}/auth/refresh`){
       removeItem(KEY_ACCESS_TOKEN);
       window.location.replace('/login' , '_self')
       return Promise.reject(error);
    }

    if(statusCode === 401){
        const response = await axios.create({
            withCredentials: true,
        }).get('/auth/refresh')
        console.log('response from backend'+ response);

        if(response.status === 'ok'){
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers['Authorization'] = `Bearer ${response.result.accessToken}`;
    
            return axios(originalRequest);
        }
    }

    store.dispatch(setLoading(false));
    return Promise.reject(error)
    
});
