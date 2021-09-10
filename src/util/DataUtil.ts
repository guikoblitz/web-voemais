import moment from 'moment';

export function formatarDataQDate(data: string): string {
  return moment(data, 'YYYY/MM/DD').format('DD/MM/YYYY');
}

export function getDataFormatada(date: Date): string {
  if (date) {
    return moment(date).format('DD/MM/YYYY');
  } else {
    return '';
  }
}

export function getDataHoraFormatada(
  date: Date,
  exibirSegundos = false
): string | void {
  if (date) {
    if (exibirSegundos) {
      return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}

export function getDataBD(date: Date): string {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}
