import moment from 'moment';
import { QDate } from 'quasar';
import { TravelPackage } from 'src/entities/TravelPackage';
import { getDataFormatada, getDataHoraFormatada } from 'src/util/DataUtil';
import { Vue, Component } from 'vue-property-decorator';
import CurrencyInput from 'src/components/currency/VueCurrency.vue';
import { notificarAlerta } from 'src/util/NotifyUtil';

@Component({ components: { CurrencyInput } })
export default class CadastroPacotesPage extends Vue {
  travel_package = new TravelPackage();
  updateKeyForm = 0;
  travel_package_types: string[] = [
    'Celular',
    'Residencial',
    'Comercial',
    'Fax'
  ];
  isDataInicialSelecionada = false;
  isDataInicialFinalizada = false;
  isDataFinalSelecionada = false;
  currencyOptions = {
    locale: 'pt-BR',
    currency: 'BRL',
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: true
  };

  constructor() {
    super();

    this.travel_package.promotion = false;
    this['getDataFormatada'] = getDataFormatada;
    this['getDataHoraFormatada'] = getDataHoraFormatada;
  }

  $refs!: {
    qDatePacoteDataInicial: QDate;
    qDatePacoteDataFinal: QDate;
    file: any;
  };

  buscarImagem(): void {
    if (this.$refs.file.files?.length > 0) {
      const file = this.$refs.file.files[0] as File;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.travel_package.image = file.name;
        this.$forceUpdate();
      } else {
        notificarAlerta('Selecione uma Imagem válida.');
      }
    }
  }

  removerCampoFiltro(nomeCampo: string): void {
    this.travel_package[nomeCampo] = '';

    if (nomeCampo === 'start_date') {
      this.isDataInicialSelecionada = false;
      this.isDataInicialFinalizada = false;
      delete this.travel_package.end_date;
    }

    this.$forceUpdate();
  }

  limpar(): void {
    this.travel_package = new TravelPackage();
    this.travel_package.promotion = false;
  }

  confirmar(): void {
    console.log(this.travel_package);
  }

  hide(qDateRef: string): void {
    this.$refs[qDateRef].hide();
  }

  validarOptionsDataInicial(data: Date): boolean {
    const dataCalendario = moment(data).format('YYYY/MM/DD');
    return dataCalendario >= moment().format('YYYY/MM/DD');
  }

  validarOptionsHoraInicial(hour: number, min: number): boolean {
    if (
      moment(this.travel_package.start_date).format('YYYY/MM/DD') ===
      moment().format('YYYY/MM/DD')
    ) {
      return min
        ? hour >= Number(moment().format('HH')) &&
            min >= Number(moment().format('mm'))
        : hour >= Number(moment().format('HH'));
    } else {
      console.log('teste');
      return true;
    }
  }

  validarOptionsDataFinal(data: Date): boolean {
    const dataCalendario = moment(data).format('YYYY/MM/DD');
    return (
      dataCalendario >=
      moment(this.travel_package.start_date).format('YYYY/MM/DD')
    );
  }

  validarOptionsHoraFinal(hour: number): boolean {
    if (
      moment(this.travel_package.end_date).format('YYYY/MM/DD') ===
      moment(this.travel_package.start_date).format('YYYY/MM/DD')
    ) {
      return hour > Number(moment(this.travel_package.start_date).format('HH'));
    } else {
      return true;
    }
  }

  adequarData(data: string, nomeCampo: string): void {
    if (nomeCampo === 'dataInicial') {
      this.travel_package.start_date = new Date(data);
    } else {
      this.travel_package.end_date = new Date(data);
    }
  }

  limparDataFinal(): void {
    delete this.travel_package.end_date;
    this.isDataInicialFinalizada = false;
  }
}
