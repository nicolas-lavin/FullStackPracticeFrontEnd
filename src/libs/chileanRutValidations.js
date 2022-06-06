
// La siguiente función tiene como objetivo:
// Verificar si un rut es valido, en base al calculo de su digito verificador
const checkRut = (rutValue = '') => {
    // Despejar Punto1 (Sólo quito el primer punto que encuentre, que sería el punto del millón)
    // Despejar Guión
    // Despejar Punto2 (Quito el punto de los miles que me queda)
    let valor = rutValue.replace('.','').replace('-','').replace('.','');
    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0,-1);
    let dv = valor.slice(-1).toUpperCase();
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7 || cuerpo.length > 12) { 
        return false;
    }
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
    // Para cada dígito del Cuerpo
    for(let i=1;i<=cuerpo.length;i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        let index = multiplo * valor.charAt(cuerpo.length - i);
        // Sumar al Contador General
        suma = suma + index;
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);
    // Casos Especiales (0 y K)
    dv = (dv === 'K')?10:dv;
    dv = (dv === 0 || dv === '0')?11:dv;
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado.toString() !== dv.toString()) { 
        return false;
    }
    // Si todo sale bien, eliminar errores (decretar que es válido)
    return true;
}

// La siguiente funcion tiene como objetivo:
// Entregar el formato xx.xxx.xxx-x al input del rut
const formatterRut = (rut = '') => {
    let rutWithoutZeros = rut.replace(/^(0+)/g, '');
    let formatterRut = rutWithoutZeros.replace(/[.-]/g, '').replace( /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4').toUpperCase();
    return formatterRut;
}

export {checkRut, formatterRut} 