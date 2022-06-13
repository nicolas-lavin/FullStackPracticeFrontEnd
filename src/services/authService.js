import axios from "axios"

const AUTH_URL = process.env.REACT_APP_URI_BACKEND+'/auth';

export const userLogin = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(AUTH_URL+'/signin',formData);
            resolve(res.data);
            if(res.data) {
                sessionStorage.setItem("accessJWT",res.data.accessToken);
                localStorage.setItem("systemSite", JSON.stringify({refreshJWT: res.data.refreshToken}));
            }
        } catch (error) {
            reject(error);
        }
    })
}

export const userData = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if(!accessJWT){
                reject("Token no encontrado!");
            }
            const res = await axios.get(AUTH_URL+'/user', {
                headers: {
                    Authorization: `Bearer ${accessJWT}`
                }
            });
            resolve(res.data);
        } catch (error) {
            reject(error.message);
        }
    })
}

export const getNewAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { refreshJWT } = JSON.parse(localStorage.getItem("systemSite"));
            if(!refreshJWT) reject("Token no encontrado!");
            const res = await axios.post(AUTH_URL+'/refreshToken',{},{
                headers: { 'x-auth-token': refreshJWT }
            });
            if(res.data) {
                sessionStorage.setItem("accessJWT",res.data.accessToken);
            }
            resolve(true);
        } catch (error) {
            console.log(error);
            if(error.response.status === 403){
                localStorage.removeItem("systemSite");
            }
            reject(false);
        }
    }) 
}

export const userLogout = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const accessJWT = sessionStorage.getItem("accessJWT");
            if(!localStorage.getItem("systemSite")) return reject("Usuario sin refresh token");
            const { refreshJWT } = JSON.parse(localStorage.getItem("systemSite"));
            const res = await axios.delete(AUTH_URL+'/logout', {
                headers: {
                    Authorization: `Bearer ${accessJWT}`,
                    'x-auth-token': refreshJWT
                }
            });
            if(res.status !== 204){
                reject("No se ha podido realizar el cierre de sesión");
            }
            resolve(res);
        } catch (error) {
            console.log(error);
            reject(error.message);
        }
    })
}