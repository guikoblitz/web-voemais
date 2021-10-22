export function mascaraCpfCnpj(documento: string): string {
    let mask = '';
    console.log(documento);
    if (documento || '') {
        if (documento.toString().length === 11) {
            console.log(documento);
            mask = '###.###.###-##';
        } else {
            mask = '##.###.###/####-##';
        }
    }
    return mask;
}

export function mascaraTelefoneDdd(numero): string {
    let mask = '';
    if (numero || '') {
        if (Number(numero).toString().length < 11) {
            mask = '(##)####-#####';
        } else {
            mask = '(##)#####-####';
        }
    }
    return mask;
}
