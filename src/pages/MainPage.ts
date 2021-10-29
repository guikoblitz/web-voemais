import { Vue, Component } from 'vue-property-decorator';
import TravelPackageService from 'src/services/TravelPackageService';
import { TravelPackage } from 'src/entities/TravelPackage';
import { Dialog, Loading, QCarouselSlide } from 'quasar';
import { notificarErro, notificarSucesso } from 'src/util/NotifyUtil';
import CadastroPacotesModal from 'src/components/pacotes/CadastroPacotesModal.vue';
import lodash from 'lodash';
import { formatarDinheiro } from 'src/util/FormatUtil';
import CurrencyInput from 'src/components/currency/VueCurrency.vue';
import { Country } from 'src/entities/Country';
import { TravelPackageType } from 'src/entities/TravelPackageType';
import TravelPackageTypesService from 'src/services/TravelPackageTypesService';
import CountryService from 'src/services/CountryService';
import { TravelPackageFilter } from 'src/entities/TravelPackageFilter';

@Component({ components: { CadastroPacotesModal, CurrencyInput } })
export default class MainPage extends Vue {
    travel_packages: TravelPackage[] = [];
    promotional_travel_packages: TravelPackage[] = [];
    selected_travel_package = new TravelPackage();
    filter = new TravelPackageFilter();
    countries: Country[] = [];
    travel_package_types: TravelPackageType[] = [];
    slide = 1;
    modal_title = '';
    abrirCadastroPacotes = false;
    editPackage = false;
    visualizePackage = false;
    showSearchIcon = false;
    autoplay = true;
    updateKeyInputMin = 0;
    updateKeyInputMax = 1;
    min = 0;
    max = 0;
    widthPage = 0;
    travelPackageValues = {
        min: 0,
        max: 1
    };

    constructor() {
        super();

        this['formatarDinheiro'] = formatarDinheiro;
    }

    async mounted(): Promise<void> {
        this.$store.dispatch('geral/setSystemTitle', 'Início');
        this.travel_package_types = await TravelPackageTypesService.getTravelPackagesTypes();
        this.countries = await CountryService.getCountries();
        await this.callPackageUpdates(true);
        this.promotionTravelPackages();
        this.defineMinMaxTravelPackageValues();
        this.$forceUpdate();
    }

    getMinTravelPackageValue() {
        return formatarDinheiro(this.travelPackageValues.min);
    }

    getMaxTravelPackageValue() {
        return formatarDinheiro(this.travelPackageValues.max);
    }

    handleResize({ width }): void {
        this.widthPage = width;

        if (this.widthPage <= 1300) {
            this.showSearchIcon = true;
        } else {
            this.showSearchIcon = false;
        }
    }

    filterTravelPackages() {
        this.filter.min_unit_price = this.travelPackageValues.min;
        this.filter.max_unit_price = this.travelPackageValues.max;

        console.log(this.filter);
    }

    promotionTravelPackages() {
        this.promotional_travel_packages = this.travel_packages.filter(tp => tp.promotion === true);
    }

    defineMinMaxTravelPackageValues() {
        if (this.travel_packages?.length > 0) {
            this.travelPackageValues.min = this.travel_packages[0].unit_price ?? 0;
            this.travelPackageValues.max = this.travel_packages[0].unit_price ?? 0;
            for (let index = 0; index < this.travel_packages.length; index++) {
                const travelPackage = this.travel_packages[index];
                if (travelPackage.unit_price && travelPackage.unit_price < this.travelPackageValues.min) {
                    this.travelPackageValues.min = travelPackage.unit_price;
                }
                if (travelPackage.unit_price && travelPackage.unit_price > this.travelPackageValues.max) {
                    this.travelPackageValues.max = travelPackage.unit_price;
                }
            }
        }
        this.min = this.travelPackageValues.min;
        this.max = this.travelPackageValues.max;
    }

    async callPackageUpdates(callUpdates: boolean): Promise<void> {
        if (callUpdates) {
            Loading.show({ message: 'Carregando Pacotes...' });
            this.travel_packages = await TravelPackageService.getTravelPackages();
            Loading.hide();
        }
    }

    validateEmployee() {
        if (this.$store.state.geral.usuarioLogado && this.$store.state.geral.usuarioLogado.employee) {
            return true;
        }
        return false;
    }

    visualizeTravelPackage(travelPackage: TravelPackage): void {
        this.editPackage = false;
        this.visualizePackage = true;
        this.modal_title = 'Visualizar Pacote de Viagem';
        this.selected_travel_package = lodash.cloneDeep(travelPackage);
        this.abrirCadastroPacotes = true;
    }

    createTravelPackage(): void {
        this.editPackage = false;
        this.visualizePackage = false;
        this.modal_title = 'Criar Pacote de Viagem';
        this.selected_travel_package = new TravelPackage();
        this.abrirCadastroPacotes = true;
    }

    editTravelPackage(travelPackage: TravelPackage): void {
        this.editPackage = true;
        this.visualizePackage = false;
        this.modal_title = 'Editar Pacote de Viagem';
        this.selected_travel_package = lodash.cloneDeep(travelPackage);
        this.abrirCadastroPacotes = true;
    }

    askDeletePackage(travelPackage: TravelPackage): void {
        Dialog.create({
            title: 'Excluir Pacote de Viagem',
            message: `Tem certeza de que deseja excluir o pacote de viagem "${travelPackage.name_travel_package}"?`,
            ok: 'Sim',
            cancel: 'Não',
            persistent: true
        })
            .onOk(async () => {
                await this.deletePackage(travelPackage);
            })
            .onCancel(() => {});
    }

    async deletePackage(travelPackage: TravelPackage): Promise<void> {
        try {
            Loading.show({ message: 'Excluindo Pacote de Viagem...' });

            const travelPackageId = travelPackage.id_travel_pack;
            const returnDeleteTravelPackage = await TravelPackageService.deleteTravelPackage(travelPackage);

            if (returnDeleteTravelPackage) {
                notificarSucesso('Pacote de Viagem excluído com sucesso!');
                const indexPackage = this.travel_packages.findIndex(tp => tp.id_travel_pack === travelPackageId);
                if (indexPackage !== -1) {
                    this.travel_packages.splice(indexPackage, 1);
                }
            }
        } catch (e) {
            console.log(e);
            notificarErro('Houve um erro ao excluir o Pacote de Viagem');
        } finally {
            Loading.hide();
        }
    }

    getImgUrl(imagePath: string): string {
        return `imagens_pacotes/${imagePath}`;
    }
}
