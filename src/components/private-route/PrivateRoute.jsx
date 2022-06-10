import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/loginSlice.js'
import { getNewAccessJWT } from '../../services/authService.js';

export const PrivateRoute = ({ children })  => {
    const { isAuth } = useSelector(state => state.login);
    const dispatch = useDispatch(); 

    useEffect(() => {
        const updateAccessJWT = async () => {
            const result = await getNewAccessJWT();
            result && dispatch(loginSuccess());
        }
        updateAccessJWT();
        sessionStorage.getItem("accessJWT") && dispatch(loginSuccess());
    },[dispatch])

    return ( isAuth ? children : <Navigate to="/login/sign-in" replace />)
}