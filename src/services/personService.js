import axios from "axios"

const AUTH_URL = process.env.REACT_APP_URI_BACKEND;

export const getAllPersons = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(AUTH_URL+'/person');
            resolve(res.data);
        } catch (error) {
            reject(error.message);
        }
    })
}

export const updatePerson = async (personId, formData) => {
    try { 
        const res = await axios.put(AUTH_URL+'/person/'+personId,formData);
        return {status: "success", message: res.data.message};
    } catch (error) {
        return {status: "error", message: error.response.data.message};
    }
}

export const getSinglePerson = async (personId) => {
    try {
        const res = await axios.get(AUTH_URL+'/person'+personId);
        return {status: "success", data: res.data.data, message: res.data.message}
    } catch (error) {
        return {status: "error", message: error.response.data.message}
    }
}

export const storePerson = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(AUTH_URL+'/person',formData);
            resolve(res.data.message);
        } catch (error) {
            reject(error.response.data.message);
        }
    })
}