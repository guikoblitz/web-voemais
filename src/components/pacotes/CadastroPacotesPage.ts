import moment from 'moment';
import { Loading, QDate } from 'quasar';
import { TravelPackage } from 'src/entities/TravelPackage';
import { getDataFormatada, getDataHoraFormatada } from 'src/util/DataUtil';
import { Vue, Component } from 'vue-property-decorator';
import CurrencyInput from 'src/components/currency/VueCurrency.vue';
import { notificarAlerta } from 'src/util/NotifyUtil';
import TravelPackageTypesService from 'src/services/TravelPackageTypesService';
import CountryService from 'src/services/CountryService';
import { TravelPackageType } from 'src/entities/TravelPackageType';
import { Country } from 'src/entities/Country';

@Component({ components: { CurrencyInput } })
export default class CadastroPacotesPage extends Vue {
    travel_package = new TravelPackage();
    updateKeyForm = 0;
    updateKeyInput = 0;
    travel_package_types: TravelPackageType[] = [];
    countries: Country[] = [];
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

    async mounted(): Promise<void> {
        Loading.show({ message: 'Carregando informações de Pacotes...' });
        this.travel_package_types = await TravelPackageTypesService.getTravelPackagesTypes();
        this.countries = await CountryService.getCountries();
        Loading.hide();
    }

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
        console.log('Confirmar');
        //   try {
        //     if (this.travel_package.id_travel_pack) {
        //       Loading.show({ message: 'Atualizando Pacote de Viagem...' });

        //       const returnUpdateTravelPackage = await TravelPackageService.updateTravelPackage(
        //         this.travel_package
        //       );
        //       console.log(returnUpdateTravelPackage);

        //       if (returnUpdateTravelPackage) {
        //         notificarSucesso('Pacote de Viagem atualizado com sucesso!');
        //         this.travel_package = new TravelPackage(); // TODO direcionar para a pagina inicial após implementar Vuex
        //       }
        //     } else {
        //       Loading.show({ message: 'Inserindo Pacote de Viagem...' });

        //       const returnInsertTravelPackage = await TravelPackageService.createTravelPackage(
        //         this.travel_package
        //       );
        //       console.log(returnInsertTravelPackage);

        //       if (returnInsertTravelPackage) {
        //         notificarSucesso('Pacote de Viagem inserido com sucesso!');
        //         this.travel_package.id_travel_pack =
        //           returnInsertTravelPackage.id_travel_pack;
        //         this.travel_package = new TravelPackage(); // TODO direcionar para a pagina inicial após implementar Vuex
        //       }
        //     }
        //     this.updateKeyInput++;
        //   } catch (e) {
        //     console.log(e);
        //     notificarErro('Houve um erro ao executar esta ação.');
        //   } finally {
        //     Loading.hide();
        //   }
    }

    hide(qDateRef: string): void {
        this.$refs[qDateRef].hide();
    }

    validarOptionsDataInicial(data: Date): boolean {
        const dataCalendario = moment(data).format('YYYY/MM/DD');
        return dataCalendario >= moment().format('YYYY/MM/DD');
    }

    validarOptionsHoraInicial(hour: number, min: number): boolean {
        if (moment(this.travel_package.start_date).format('YYYY/MM/DD') === moment().format('YYYY/MM/DD')) {
            return min
                ? hour >= Number(moment().format('HH')) && min >= Number(moment().format('mm'))
                : hour >= Number(moment().format('HH'));
        } else {
            console.log('teste');
            return true;
        }
    }

    validarOptionsDataFinal(data: Date): boolean {
        const dataCalendario = moment(data).format('YYYY/MM/DD');
        return dataCalendario >= moment(this.travel_package.start_date).format('YYYY/MM/DD');
    }

    validarOptionsHoraFinal(hour: number): boolean {
        if (moment(this.travel_package.end_date).format('YYYY/MM/DD') === moment(this.travel_package.start_date).format('YYYY/MM/DD')) {
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
