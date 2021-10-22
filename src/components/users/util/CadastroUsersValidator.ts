import { User } from 'src/entities/User';
import FormValidator from 'src/util/FormValidator';
import { isValidEmail } from 'src/util/GenericUtil';

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
        this.formValidator.validarCampo('', 'password', 0, true, types.string);
        this.formValidator.validarCampo('', 'password_confirmation', 0, true, types.string);
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

        if (this.user && this.user.cpf) {
            this.validateCpfLength(this.user.cpf);
        }
        if (this.user && this.user.email) {
            this.validateEmail(this.user.email);
        }
        if (this.user && this.user.cep) {
            this.validateCepLength(this.user.cep);
        }
        if (this.user && this.user.num_phone) {
            this.validatePhone(this.user.num_phone);
        }
        if (this.user && this.user.password) {
            this.validatePassword();
        }
    }

    validateCpfLength(cpf: string): void {
        if (cpf.length < 11) {
            const msg = 'O CPF deve conter no mínimo 11 números.';
            this.formValidator.addError('cpf', msg);
        }
    }

    validateEmail(email: string): void {
        if (!isValidEmail(email)) {
            const msg = 'O formato de e-mail digitado é inválido.';
            this.formValidator.addError('email', msg);
        }
    }

    validateCepLength(cep: string): void {
        if (cep.length < 8) {
            const msg = 'O CEP deve conter no mínimo 8 números.';
            this.formValidator.addError('cep', msg);
        }
    }

    validatePhone(phone: string): void {
        if (phone.length < 10) {
            const msg = 'O Telefone deve conter no mínimo 10 números, contando o DDD.';
            this.formValidator.addError('num_phone', msg);
        }
    }

    validatePassword(): void {
        if (this.user.password_confirmation) {
            this.validatePasswordConfirmation(this.user.password, this.user.password_confirmation);
        } else {
            const msg = 'É preciso digitar a senha e confirmá-la.';
            this.formValidator.addError('password', msg);
            this.formValidator.addError('password_confirmation', msg);
        }
    }

    validatePasswordConfirmation(password: string, passwordConfirmation: string): boolean {
        if (password === passwordConfirmation) {
            return true;
        } else {
            const msg = 'As senhas digitadas não conferem.';
            this.formValidator.addError('password', msg);
            this.formValidator.addError('password_confirmation', msg);
            return false;
        }
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
