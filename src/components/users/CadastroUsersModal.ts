import { Loading, QDate } from 'quasar';
import { formatarDataQDate, getDataBD, getDataFormatada } from 'src/util/DataUtil';
import { mascaraCpfCnpj } from 'src/util/MaskUtil';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { User } from 'src/entities/User';
import { notificarErro, notificarSucesso } from 'src/util/NotifyUtil';
import UserService from 'src/services/UserService';
import { Country } from 'src/entities/Country';
import CountryService from 'src/services/CountryService';
import { StreetType } from 'src/entities/StreetType';
import { PhoneType } from 'src/entities/PhoneType';
import StreetTypesService from 'src/services/StreetTypesService';
import PhoneTypesService from 'src/services/PhoneTypesService';
import moment from 'moment';
import CadastroUsersValidator from './util/CadastroUsersValidator';

@Component
export default class CadastroUsersModal extends Vue {
    user = new User();
    modal_title = 'Cadastro de Usuário';
    visualizeRegister = false;
    countries: Country[] = [];
    street_types: StreetType[] = [];
    phone_types: PhoneType[] = [];
    formValidator = new CadastroUsersValidator(this.$refs);

    constructor() {
        super();

        this['getDataFormatada'] = getDataFormatada;
        this['formatarData'] = formatarDataQDate;
        this['getDataBD'] = getDataBD;
        this['mascaraCpfCnpj'] = mascaraCpfCnpj;

        if (!this.user.id_user) this.user.employee = false;
    }

    $refs!: {
        qDateDataNascimento: QDate;
    };

    @Prop()
    readonly abrirCadastroUsers: boolean;

    @Emit('closeModal')
    closeModal(): boolean {
        return false;
    }

    async mounted(): Promise<void> {
        Loading.show({ message: 'Carregando informações de Usuário...' });
        this.street_types = await StreetTypesService.getStreetTypes();
        this.phone_types = await PhoneTypesService.getPhoneTypes();
        this.countries = await CountryService.getCountries();
        this.$forceUpdate();
        Loading.hide();
    }

    handleBirthDate(date_birth: Date): string {
        return moment(date_birth).format('DD/MM/YYYY');
    }

    async confirmar(): Promise<void> {
        try {
            if (this.formValidator.validateForm(this.user)) {
                Loading.show({ message: 'Criando Usuário...' });

                if (this.user.date_birth && typeof this.user.date_birth !== 'string') {
                    this.user.date_birth = this.handleBirthDate(this.user.date_birth);
                }

                const returnCreateUser = await UserService.createUser(this.user);
                console.log(returnCreateUser);

                if (returnCreateUser) {
                    notificarSucesso('Usuário criado com sucesso!');
                    this.user = new User();
                }
                this.closeModal();
            }
        } catch (e) {
            console.log(e);
            notificarErro('Houve um erro ao executar esta ação.');
        } finally {
            Loading.hide();
        }
    }

    // confirmar(): void {
    //   console.log(this.user);
    // }

    resetarErroCampo(nomeCampo: string): void {
        this.formValidator.resetError(nomeCampo);
    }

    hide(qDateRef: string): void {
        this.$refs[qDateRef].hide();
    }

    atribuirData(data: string): void {
        this.user.date_birth = new Date(data);
    }
}
