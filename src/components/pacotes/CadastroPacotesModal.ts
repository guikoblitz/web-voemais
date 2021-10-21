import moment from 'moment';
import { Loading, QDate } from 'quasar';
import { Country } from 'src/entities/Country';
import { TravelPackage } from 'src/entities/TravelPackage';
import { TravelPackageType } from 'src/entities/TravelPackageType';
import CountryService from 'src/services/CountryService';
import CurrencyInput from 'src/components/currency/VueCurrency.vue';
import TravelPackageTypesService from 'src/services/TravelPackageTypesService';
import { getDataFormatada, getDataHoraFormatada } from 'src/util/DataUtil';
import { notificarAlerta, notificarErro, notificarSucesso } from 'src/util/NotifyUtil';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import lodash from 'lodash';
import TravelPackageService from 'src/services/TravelPackageService';
import { getValorNumber } from 'src/util/GenericUtil';
import { formatarDinheiro } from 'src/util/FormatUtil';
import CadastroPacotesValidator from './util/CadastroPacotesValidator';

@Component({ components: { CurrencyInput } })
export default class CadastroPacotesModal extends Vue {
    travel_package_types: TravelPackageType[] = [];
    travel_package = new TravelPackage();
    formValidator = new CadastroPacotesValidator(this.$refs);
    countries: Country[] = [];
    updateKeyForm = 0;
    updateKeyInput = 0;
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

        if (this.received_travel_package.id_travel_pack) {
            this.travel_package = lodash.cloneDeep(this.received_travel_package);
            this.travel_package.unit_price = getValorNumber(this.travel_package.unit_price) ?? undefined;
        } else {
            this.travel_package.promotion = false;
        }

        this['getDataFormatada'] = getDataFormatada;
        this['getDataHoraFormatada'] = getDataHoraFormatada;
        this['getValorNumber'] = getValorNumber;
        this['formatarDinheiro'] = formatarDinheiro;
    }

    $refs!: {
        qDatePacoteDataInicial: QDate;
        qDatePacoteDataFinal: QDate;
        file: any;
    };

    @Prop()
    readonly abrirCadastroPacotes: boolean;

    @Prop()
    readonly visualizePackage: boolean;

    @Prop()
    readonly editPackage: boolean;

    @Prop()
    readonly modal_title: string;

    @Prop({
        default: () => {
            return {};
        }
    })
    readonly received_travel_package: TravelPackage;

    @Emit('closeModal')
    closeModal(): boolean {
        return false;
    }

    @Emit('callPackageUpdates')
    callPackageUpdates(): boolean {
        return true;
    }

    async mounted(): Promise<void> {
        Loading.show({ message: 'Carregando informações de Pacotes...' });
        this.travel_package_types = await TravelPackageTypesService.getTravelPackagesTypes();
        this.countries = await CountryService.getCountries();
        this.$forceUpdate();
        Loading.hide();
    }

    buscarImagem(): void {
        if (this.$refs.file.files?.length > 0) {
            const file = this.$refs.file.files[0] as File;
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                this.travel_package.image = file.name;
                this.resetarErroCampo('image');
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

    adquirir(): void {
        notificarSucesso(`Parabéns! Você adquiriu o Pacote de Viagem "${this.travel_package.name_travel_package}"!`);
        this.closeModal();
        this.callPackageUpdates();
    }

    async confirmar(): Promise<void> {
        try {
            if (this.formValidator.validateForm(this.travel_package)) {
                if (this.editPackage) {
                    Loading.show({ message: 'Atualizando Pacote de Viagem...' });

                    const returnUpdateTravelPackage = await TravelPackageService.updateTravelPackage(this.travel_package);
                    console.log(returnUpdateTravelPackage);

                    if (returnUpdateTravelPackage) {
                        notificarSucesso('Pacote de Viagem atualizado com sucesso!');
                        this.travel_package = new TravelPackage();
                    }
                } else {
                    Loading.show({ message: 'Inserindo Pacote de Viagem...' });

                    const returnInsertTravelPackage = await TravelPackageService.createTravelPackage(this.travel_package);
                    console.log(returnInsertTravelPackage);

                    if (returnInsertTravelPackage) {
                        notificarSucesso('Pacote de Viagem inserido com sucesso!');
                        this.travel_package.id_travel_pack = returnInsertTravelPackage.id_travel_pack;
                        this.travel_package = new TravelPackage();
                    }
                }
                this.updateKeyInput++;
                this.closeModal();
                this.callPackageUpdates();
            }
        } catch (e) {
            console.log(e);
            notificarErro('Houve um erro ao executar esta ação.');
        } finally {
            Loading.hide();
        }
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

    handleDates(data: string, nomeCampo: string): void {
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

    resetarErroCampo(nomeCampo: string): void {
        this.formValidator.resetError(nomeCampo);
    }

    getImgUrl(imagePath: string): string {
        return `imagens_pacotes/${imagePath}`;
    }
}
