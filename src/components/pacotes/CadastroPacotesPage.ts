import { QDate } from 'quasar';
import { TravelPackage } from 'src/entities/TravelPackage';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class CadastroPacotesPage extends Vue {
  travel_package = new TravelPackage();
  travel_package_types: string[] = [
    'Celular',
    'Residencial',
    'Comercial',
    'Fax'
  ];
  teste = '';

  constructor() {
    super();

    this.travel_package.promotion = false;
  }

  $refs!: {
    qDatePacoteDataInicial: QDate;
    qDatePacoteDataFinal: QDate;
  };

  confirmar(): void {
    console.log(this.travel_package);
  }

  hide(qDateRef: string): void {
    this.$refs[qDateRef].hide();
  }
}
