import moment from 'moment';
import { TravelPackage } from 'src/entities/TravelPackage';
import FormValidator from 'src/util/FormValidator';

export default class CadastroPacotesValidator {
  travelPackage: TravelPackage;
  error: any = {};
  refs: any;
  formValidator: any;

  constructor(refs: any) {
    this.refs = refs;
  }

  validateForm(travelPackage: TravelPackage): boolean {
    this.travelPackage = travelPackage;
    this.formValidator = new FormValidator(travelPackage);

    if (!this.formValidator.error) {
      this.validateTravelPackage();
    }

    const isValid = !this.formValidator.error;

    this.error = this.formValidator.error;

    return isValid;
  }

  validateTravelPackage() {
    this.formValidator.validarCampo(
      '',
      'id_travel_package_type',
      0,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'id_country_origin',
      0,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'id_country_destination',
      0,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'name_travel_package',
      30,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'description',
      250,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'image',
      250,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'promotion',
      0,
      true,
      this.formValidator.types.boolean
    );
    this.formValidator.validarCampo(
      '',
      'start_date',
      0,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'end_date',
      0,
      true,
      this.formValidator.types.string
    );
    this.formValidator.validarCampo(
      '',
      'unit_price',
      0,
      true,
      this.formValidator.types.number
    );

    // if (this.travelPackage.dataInicial && this.travelPackage.dataFinal) {
    //     const dateDataInicio = moment(this.travelPackage.dataInicial, 'DD/MM/YYYY').toDate();
    //     const dateDataFim = moment(this.travelPackage.dataFinal, 'DD/MM/YYYY').toDate();
    //     this.validarDataInicio(dateDataInicio, dateDataFim);
    //     this.validarDataFim(dateDataInicio, dateDataFim);
    // }
    // if (this.travelPackage.chave) {
    //     this.validarTamanhoChaveNFe(this.travelPackage.chave);
    // }
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
