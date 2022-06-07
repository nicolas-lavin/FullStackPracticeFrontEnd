import * as Yup from 'yup';

const signInValidations = () => {

    return Yup.object({
        userName: Yup.string().required("El nombre de usuario es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    });
}

export default signInValidations;