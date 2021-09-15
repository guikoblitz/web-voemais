import { QDate } from 'quasar';
import {
  formatarDataQDate,
  getDataBD,
  getDataFormatada
} from 'src/util/DataUtil';
import { mascaraCpfCnpj } from 'src/util/MaskUtil';
import { Vue, Component } from 'vue-property-decorator';
import { Estado, listaEstados } from 'src/util/Constantes';
import { Pessoa } from 'src/entities/Pessoa';

@Component
export default class CadastroClientePage extends Vue {
  pessoa = new Pessoa();
  listaTipoTelefones: string[] = ['Celular', 'Residencial', 'Comercial', 'Fax'];
  listaTipoLogradouros: string[] = [
    'Rua',
    'Avenida',
    'Alameda',
    'Travessa',
    'Rodovia'
  ];
  listaEstados: Estado[] = [];

  constructor() {
    super();

    this['getDataFormatada'] = getDataFormatada;
    this['formatarData'] = formatarDataQDate;
    this['getDataBD'] = getDataBD;
    this['mascaraCpfCnpj'] = mascaraCpfCnpj;

    this.listaEstados = [...listaEstados];
  }

  $refs!: {
    qDateDataNascimento: QDate;
  };

  confirmar(): void {
    console.log(this.pessoa);
  }

  hide(qDateRef: string): void {
    this.$refs[qDateRef].hide();
  }

  atribuirData(data: string): void {
    const formatoData = new Date(data);
    this.pessoa.dataNascimento = getDataBD(formatoData);
  }
}
