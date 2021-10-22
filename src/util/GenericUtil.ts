export function getValorNumber(valor: any) {
    return Number(valor);
}

export function getSomenteNumeros(valor: any) {
    if (valor) {
        return valor.match(/[0-9]+/g).join([]);
    }
}

export function isValidEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
