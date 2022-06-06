import * as Yup from 'yup';
import {checkRut} from '../../../libs/chileanRutValidations';

const formPersonValidations = () => {
    const phoneRegExp = /\D*([2-9])(\d{4})(\d{4})\D*/;

    return Yup.object({
        rut: Yup.string()
        .min(11,"El rut debe tener como minimo un largo de 7 digitos")
        .test('checkRut', 'Debe ingresar un rut valido', (value) => checkRut(value))
        .required("El rut es requerido"),
        name: Yup.string().required("El nombre es requerido"),
        email: Yup.string().email("El email debe ser valido").required("El correo electronico es requerido"),
        phone: Yup.string()
        .matches(phoneRegExp, 'El teléfono es invalido')
        .required("El numero de teléfono es requerido"),
        type_person_id: Yup.string().required("Debe seleccionar el tipo de persona"),
    });
}

export default formPersonValidations;



