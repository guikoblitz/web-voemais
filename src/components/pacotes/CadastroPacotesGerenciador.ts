import { Dialog, Loading, QTable } from 'quasar';
import { TravelPackage } from 'src/entities/TravelPackage';
import TravelPackageService from 'src/services/TravelPackageService';
import { getDataFormatada } from 'src/util/DataUtil';
import { formatarDinheiro } from 'src/util/FormatUtil';
import { notificarErro, notificarSucesso } from 'src/util/NotifyUtil';
import { Component, Vue } from 'vue-property-decorator';
import { travelPackagesColumnsInterface } from './util/CadastroPacotesTypes';
import CadastroPacotesModal from 'src/components/pacotes/CadastroPacotesModal.vue';
import lodash from 'lodash';

@Component({ components: { CadastroPacotesModal } })
export default class CadastroPacotesGerenciador extends Vue {
    travelPackagesColumns: QTable['columns'];
    travelPackagesList: TravelPackage[] = [];
    selected_travel_package = new TravelPackage();
    tokenEmployee: string | undefined = undefined;
    pagesNumber = 0;
    modal_title = '';
    abrirCadastroPacotes = false;
    editPackage = false;
    visualizePackage = false;

    pagination = {
        page: 1,
        rowsPerPage: 20 // 0 means all rows
    };

    constructor() {
        super();
        this['getDataFormatada'] = getDataFormatada;
        this['formatarDinheiro'] = formatarDinheiro;

        this.travelPackagesColumns = travelPackagesColumnsInterface;
    }

    async mounted(): Promise<void> {
        if (this.validateLoggedUser() && this.validateEmployee()) {
            this.tokenEmployee = this.$store.state.geral.tokenUsuarioLogado;
            this.$store.dispatch('geral/setSystemTitle', 'Gerenciador de Pacotes');
            await this.callPackageUpdates(true);
        } else {
            this.setRouter('/');
        }
    }

    sortByTravelPackageName(): void {
        this.travelPackagesList.sort((a: TravelPackage, b: TravelPackage) => {
            if (a.name_travel_package > b.name_travel_package) {
                return 1;
            } else if (a.name_travel_package < b.name_travel_package) {
                return -1;
            }
            return 0;
        });
    }

    setRouter(path: string): void {
        this.$router.push(path).catch(() => {});
    }

    validateLoggedUser() {
        if (this.$store.state.geral.usuarioLogado) {
            return true;
        }
        return false;
    }

    validateEmployee() {
        if (this.validateLoggedUser() && this.$store.state.geral.usuarioLogado.employee) {
            return true;
        }
        return false;
    }

    async callPackageUpdates(callUpdates: boolean): Promise<void> {
        if (callUpdates) {
            Loading.show({ message: 'Carregando Pacotes...' });
            this.travelPackagesList = await TravelPackageService.getTravelPackages();
            this.sortByTravelPackageName();

            const calculoPagesNumber = Math.ceil(this.travelPackagesList.length / this.pagination.rowsPerPage);
            this.pagesNumber = calculoPagesNumber > 0 ? calculoPagesNumber : 1;
            Loading.hide();
        }
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
            const returnDeleteTravelPackage = await TravelPackageService.deleteTravelPackage(travelPackage, this.tokenEmployee);

            if (returnDeleteTravelPackage) {
                notificarSucesso('Pacote de Viagem excluído com sucesso!');
                const indexPackage = this.travelPackagesList.findIndex(tp => tp.id_travel_pack === travelPackageId);
                if (indexPackage !== -1) {
                    this.travelPackagesList.splice(indexPackage, 1);
                }
            }
        } catch (e) {
            console.log(e);
            notificarErro('Houve um erro ao excluir o Pacote de Viagem');
        } finally {
            Loading.hide();
        }
    }
}
