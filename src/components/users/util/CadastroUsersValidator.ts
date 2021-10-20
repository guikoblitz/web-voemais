import { User } from 'src/entities/User';
import FormValidator from 'src/util/FormValidator';

export default class CadastroUsersValidator {
    user: User;
    error: any = {};
    refs: any;
    formValidator: any;

    constructor(refs: any) {
        this.refs = refs;
    }

    validateForm(user: User): boolean {
        this.user = user;
        this.formValidator = new FormValidator(user);

        if (!this.formValidator.error) {
            this.validateUser();
        }

        const isValid = !this.formValidator.error;

        this.error = this.formValidator.error;

        return isValid;
    }

    validateUser() {
        const types = this.formValidator.types;

        this.formValidator.validarCampo('', 'name', 30, true, types.string);
        this.formValidator.validarCampo('', 'last_name', 30, true, types.string);
        this.formValidator.validarCampo('', 'cpf', 11, true, types.string);
        this.formValidator.validarCampo('', 'date_birth', 0, true, types.string);
        this.formValidator.validarCampo('', 'email', 30, true, types.string);
        this.formValidator.validarCampo('', 'cep', 8, true, types.string);
        this.formValidator.validarCampo('', 'id_country', 0, true, types.string);
        this.formValidator.validarCampo('', 'name_state', 40, true, types.string);
        this.formValidator.validarCampo('', 'name_city', 40, true, types.string);
        this.formValidator.validarCampo('', 'name_neighborhood', 30, true, types.string);
        this.formValidator.validarCampo('', 'id_street', 0, true, types.string);
        this.formValidator.validarCampo('', 'name_address', 50, true, types.string);
        this.formValidator.validarCampo('', 'num_address', 0, true, types.string); // TODO verificar
        this.formValidator.validarCampo('', 'complement', 20, true, types.string);
        this.formValidator.validarCampo('', 'id_phone_type', 0, true, types.string);
        this.formValidator.validarCampo('', 'num_phone', 20, true, types.string);

        // TODO validação de password
    }

    isError(campo: string): boolean {
        const erro = !!(this.error && this.error[campo]);
        if (erro && this.error.focus && campo === this.error.focus) {
            setTimeout(() => {
                const componente = this.refs[this.error.focus];
                if (componente) {
                    componente.focus();
                }
            }, 50);
        }
        return erro;
    }

    getError(campo: string): boolean {
        return this.isError(campo) ? this.error[campo] : '';
    }

    resetError(campo: string | undefined = undefined): void {
        if (campo) {
            if (this.isError(campo)) {
                delete this.error[campo];
            }
            if (this.error && this.error.focus) {
                delete this.error.focus;
            }
        } else {
            for (const nomeCampo in this.refs) {
                if (this.error) delete this.error[nomeCampo];
            }
        }
    }
}
