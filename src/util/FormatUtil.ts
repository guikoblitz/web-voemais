import { getValorNumber } from './GenericUtil';

export function formatarDinheiro(valor, mostraMoeda = true): string {
  if (!valor) {
    valor = 0;
  }
  if (typeof valor === 'string') {
    valor = getValorNumber(valor);
  }
  let valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  if (!mostraMoeda) {
    valorFormatado = removerSiglaDinheiro(valorFormatado);
  }
  if (valor === 0) {
    valorFormatado = (mostraMoeda ? 'R$ ' : '') + '0,00';
  }
  return `${valorFormatado}`;
}

export function removerSiglaDinheiro(valor): string {
  valor = valor.replace('%', '');
  valor = valor.replace('R$', '');
  valor = valor.replace('r$', '');
  valor = valor.replace(' ', '');
  return valor;
}
