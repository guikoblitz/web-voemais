export const listaEstados: Estado[] = [
  { label: 'AC - Acre', value: 'AC', estado: 'Acre' },
  { label: 'AL - Alagoas', value: 'AL', estado: 'Alagoas' },
  { label: 'AP - Amapá', value: 'AP', estado: 'Amapá' },
  { label: 'AM - Amazonas', value: 'AM', estado: 'Amazonas' },
  { label: 'BA - Bahia', value: 'BA', estado: 'Bahia' },
  { label: 'CE - Ceará', value: 'CE', estado: 'Ceará' },
  { label: 'DF - Distrito Federal', value: 'DF', estado: 'Distrito Federal' },
  { label: 'ES - Espírito Santo', value: 'ES', estado: 'Espírito Santo' },
  { label: 'GO - Goías', value: 'GO', estado: 'Goías' },
  { label: 'MA - Maranhão', value: 'MA', estado: 'Maranhão' },
  { label: 'MT - Mato Grosso', value: 'MT', estado: 'Mato Grosso' },
  {
    label: 'MS - Mato Grosso do Sul',
    value: 'MS',
    estado: 'Mato Grosso do Sul'
  },
  { label: 'MG - Minas Gerais', value: 'MG', estado: 'Minas Gerais' },
  { label: 'PA - Pará', value: 'PA', estado: 'Pará' },
  { label: 'PB - Paraíba', value: 'PB', estado: 'Paraíba' },
  { label: 'PR - Paraná', value: 'PR', estado: 'Paraná' },
  { label: 'PE - Pernambuco', value: 'PE', estado: 'Pernambuco' },
  { label: 'PI - Piauí', value: 'PI', estado: 'Piauí' },
  { label: 'RJ - Rio de Janeiro', value: 'RJ', estado: 'Rio de Janeiro' },
  {
    label: 'RN - Rio Grande do Norte',
    value: 'RN',
    estado: 'Rio Grande do Norte'
  },
  { label: 'RS - Rio Grande do Sul', value: 'RS', estado: 'Rio Grande do Sul' },
  { label: 'RO - Rondônia', value: 'RO', estado: 'Rondônia' },
  { label: 'RR - Roraíma', value: 'RR', estado: 'Roraíma' },
  { label: 'SC - Santa Catarina', value: 'SC', estado: 'Santa Catarina' },
  { label: 'SP - São Paulo', value: 'SP', estado: 'São Paulo' },
  { label: 'SE - Sergipe', value: 'SE', estado: 'Sergipe' },
  { label: 'TO - Tocantins', value: 'TO', estado: 'Tocantins' }
];

export interface Estado {
  label: string;

  value: string;

  estado: string;
}
