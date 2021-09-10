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
