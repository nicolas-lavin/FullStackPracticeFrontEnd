import { getUserPending, getUserSuccess, getUserFail } from '../slices/userSlice';
import { userData } from '../../services/authService';

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(getUserPending());
        const { user } = await userData();
        if(user && user.id){
            return dispatch(getUserSuccess(user))
        }
        dispatch(getUserFail("Usuario no encontrado"));
    } catch (error) {
        dispatch(getUserFail(error));
    }
}