import { Loading, QDate } from 'quasar';
import { formatarDataQDate, getDataBD, getDataFormatada } from 'src/util/DataUtil';
import { mascaraCpfCnpj, mascaraTelefoneDdd } from 'src/util/MaskUtil';
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
    show_password = false;
    countries: Country[] = [];
    street_types: StreetType[] = [];
    phone_types: PhoneType[] = [];
    registered_users: User[] = [];
    formValidator = new CadastroUsersValidator(this.$refs);

    constructor() {
        super();

        this['getDataFormatada'] = getDataFormatada;
        this['formatarData'] = formatarDataQDate;
        this['getDataBD'] = getDataBD;
        this['mascaraCpfCnpj'] = mascaraCpfCnpj;
        this['mascaraTelefoneDdd'] = mascaraTelefoneDdd;

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
        this.registered_users = await UserService.getUsers();
        this.$forceUpdate();
        Loading.hide();
    }

    validateDateBirthOpt(birthDate: Date): boolean {
        const dataCalendario = moment(birthDate).format('YYYY/MM/DD');
        return dataCalendario <= moment().format('YYYY/MM/DD');
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

    clearRegister(): void {
        this.user = new User();
        this.user.employee = false;
    }

    checkDuplicateUser(userEmail: string): boolean {
        const indexUserEmail = this.registered_users.findIndex(user => user.email === userEmail);
        if (indexUserEmail !== -1) {
            notificarErro('E-mail de Usuário já cadastrado!');
            return false;
        } else {
            return true;
        }
    }

    async confirmar(): Promise<void> {
        try {
            if (this.formValidator.validateForm(this.user) && this.checkDuplicateUser(this.user.email)) {
                Loading.show({ message: 'Criando Usuário...' });

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
