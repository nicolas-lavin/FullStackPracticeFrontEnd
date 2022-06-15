import * as Yup from 'yup';
import YupPassword from 'yup-password'

YupPassword(Yup);

const registrationValidations = () => {

    return Yup.object({
        userName: Yup.string()
            .required("El nombre de usuario es requerido"),
        firstName: Yup.string()
            .required("El nombre es requerido"),
        lastName: Yup.string()
            .required("El apellido es requerido"),
        email: Yup.string()
            .email("Debe ingresar un correo electronico valido")
            .required("El correo electronico es requerido"), 
        password: Yup.string()
            .min(8,"La contraseña debe contener un minimo de 8 caracteres")
            .minLowercase(1, 'La contraseña debe contener como minimo una letra en MINUSCULAS')
            .minUppercase(1, 'La contraseña debe contener como minimo una letra en MAYÚSCULAS')
            .minNumbers(1, 'La contraseña debe contener a lo menos un numero')
            .minSymbols(1, 'La contraseña debe contener a los menos un caracter especial')
            .required("La contraseña es requerida"), 
        secondPassword: Yup.string()
            .oneOf([Yup.ref('password'),null],"La contraseña no coincide con la ingresada previamente")
            .required("Debe repetir su contraseña")
    });
}

export default registrationValidations;