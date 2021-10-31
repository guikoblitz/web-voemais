import { Vue, Component } from 'vue-property-decorator';
import TravelPackageService from 'src/services/TravelPackageService';
import { TravelPackage } from 'src/entities/TravelPackage';
import { Dialog, Loading } from 'quasar';
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
    filtered_travel_packages: TravelPackage[] = [];
    selected_travel_package = new TravelPackage();
    filter = new TravelPackageFilter();
    countries: Country[] = [];
    travel_package_types: TravelPackageType[] = [];
    slide = 1;
    modal_title = '';
    filterOn = false;
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
        this.$store.dispatch('geral/setSystemTitle', 'Voe+');
        await this.getTravelPackageTypes();
        await this.getCountries();
        await this.callPackageUpdates(true);
        this.promotionTravelPackages();
        this.defineMinMaxTravelPackageValues();
        this.setDefaultFilter();
        this.filtered_travel_packages = lodash.cloneDeep(this.travel_packages);
        this.$forceUpdate();
    }

    async getTravelPackageTypes() {
        this.travel_package_types = [];
        this.travel_package_types.push({ id_travel_package_type: 'Todos', travel_package_type: 'Todos' } as TravelPackageType);
        const travelPackageTypes = await TravelPackageTypesService.getTravelPackagesTypes();
        travelPackageTypes.forEach((tpt: TravelPackageType) => this.travel_package_types.push(tpt));
    }

    async getCountries() {
        this.countries = [];
        this.countries.push({ id_country: 'Todos', name_country: 'Todos' } as Country);
        const countries = await CountryService.getCountries();
        countries.forEach((country: Country) => this.countries.push(country));
    }

    setDefaultFilter() {
        this.filter = new TravelPackageFilter();
        this.filter.id_country_destination = this.countries[0].id_country;
        this.filter.id_country_origin = this.countries[0].id_country;
        this.filter.id_travel_package_type = this.travel_package_types[0].id_travel_package_type;
        this.filter.min_unit_price = this.min;
        this.filter.max_unit_price = this.max;
        this.travelPackageValues.min = this.min;
        this.travelPackageValues.max = this.max;

        this.filterOn = false;
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

        Loading.show({ message: 'Filtrando Pacotes de Viagem...' });
        setTimeout(() => {
            const filtered_list = this.travel_packages.filter(tp => {
                let validated = true;
                for (const key in this.filter) {
                    if (key === 'min_unit_price') {
                        if (tp.unit_price && this.filter[key] <= tp.unit_price) {
                            validated = true;
                        } else {
                            return false;
                        }
                    } else if (key === 'max_unit_price') {
                        if (tp.unit_price && this.filter[key] >= tp.unit_price) {
                            validated = true;
                        } else {
                            return false;
                        }
                    } else {
                        if (this.filter[key] !== 'Todos') {
                            if (tp[key] === this.filter[key]) {
                                validated = true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
                if (validated) {
                    return true;
                }
                return false;
            });
            if (filtered_list.length > 0) {
                this.filtered_travel_packages = lodash.cloneDeep(filtered_list);
                this.filterOn = true;
            } else {
                notificarErro('Nenhum Pacote de Viagem encontrado para o Filtro selecionado.');
            }
            Loading.hide();
        }, 1000);
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
