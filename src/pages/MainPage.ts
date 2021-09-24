import { Vue, Component } from 'vue-property-decorator';
import TravelPackageService from 'src/services/TravelPackageService';
import { TravelPackage } from 'src/entities/TravelPackage';
import { Dialog, Loading } from 'quasar';
import { notificarErro, notificarSucesso } from 'src/util/NotifyUtil';

@Component({})
export default class MainPage extends Vue {
  travel_packages: TravelPackage[] = [];

  async mounted(): Promise<void> {
    Loading.show({ message: 'Carregando Pacotes...' });
    this.travel_packages = await TravelPackageService.getTravelPackages();
    console.log(this.travel_packages);
    Loading.hide();
  }

  editarPacote(travelPackage: TravelPackage): void {
    console.log(travelPackage.name_travel_package);
  }

  confirmarExcluirPacote(travelPackage: TravelPackage): void {
    Dialog.create({
      title: 'Excluir Pacote de Viagem',
      message: `Tem certeza de que deseja excluir o pacote de viagem "${travelPackage.name_travel_package}"?`,
      ok: 'Sim',
      cancel: 'Não',
      persistent: true
    })
      .onOk(async () => {
        await this.excluirPacote(travelPackage);
      })
      .onCancel(() => {});
  }

  async excluirPacote(travelPackage: TravelPackage): Promise<void> {
    try {
      Loading.show({ message: 'Excluindo Pacote de Viagem...' });

      const travelPackageId = travelPackage.id_travel_pack;
      const returnDeleteTravelPackage = await TravelPackageService.deleteTravelPackage(
        travelPackage
      );
      console.log(returnDeleteTravelPackage);

      if (returnDeleteTravelPackage) {
        notificarSucesso('Pacote de Viagem excluído com sucesso!');
        const indexPackage = this.travel_packages.findIndex(
          tp => tp.id_travel_pack === travelPackageId
        );
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
