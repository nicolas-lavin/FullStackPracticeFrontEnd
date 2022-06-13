import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/loginSlice.js'
import { getNewAccessJWT } from '../../services/authService.js';

export const PrivateRoute = ()  => {
    const { isAuth } = useSelector(state => state.login);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = await getNewAccessJWT();
            result && dispatch(loginSuccess());
        }
        !sessionStorage.getItem("accessJWT") && localStorage.getItem("crmSite") && updateAccessJWT();
        !isAuth && sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    },[dispatch, isAuth])

    return isAuth ? <Outlet/> : <Navigate to="/login/sign-in" replace />
}