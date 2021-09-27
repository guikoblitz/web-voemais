import { formatarValor } from './FormatUtil';
import { getSomenteNumeros } from './GenericUtil';

export default class ValidadorCadastro {
  types = {
    boolean: 'boolean',
    int: 'int',
    money: 'money',
    float: 'float',
    string: 'string',
    object: 'object'
  };

  constructor(objetoCadastro) {
    this.objetoCadastro = objetoCadastro;
    this.error = undefined;
  }

  addError(key, message) {
    if (!this.error) this.error = {};
    this.error[key] = message;
  }

  validarCampo(
    abaNome,
    campoStr,
    tamanho,
    obrigatorio,
    tipo,
    isObejetoId = false
  ) {
    const validador = {
      abaNome,
      campoStr,
      tamanho,
      obrigatorio,
      tipo,
      isObejetoId
    };
    if (validador.obrigatorio && !this.validarValorStringSetado(validador)) {
      this.mostrarCampoComErro(validador);
      return false;
    } else if (!this.validarValorStringTamanho(validador)) {
      this.mostrarCampoComErro(
        validador,
        `Tamanho máximo é de ${validador.tamanho} caracteres!`
      );
      return false;
    }
    return true;
  }

  validarValorStringSetado(validador) {
    const valor = this.getValor(validador);
    if (valor !== undefined && valor !== null && valor !== '') {
      return true;
    }
    return false;
  }

  validarValorStringTamanho(validador) {
    const valor = `${this.getValor(validador)}`;
    if (
      this.validarValorStringSetado(validador) &&
      validador.tamanho > 0 &&
      valor.length > validador.tamanho
    ) {
      return false;
    }
    return true;
  }

  ajustarValor(valor, validador) {
    if (valor && valor !== null) {
      if (validador.tipo === this.types.int) {
        valor = getSomenteNumeros(`${valor}`);
      } else if (validador.tipo === this.types.float) {
        valor = formatarValor(`${valor}`);
      } else if (validador.tipo === this.types.money) {
        valor = formatarValor(`${valor}`);
      }
    }
    return valor;
  }

  getValor(validador) {
    this.campoTrim(validador);
    const campoStrs = validador.campoStr.split('.');
    let valor = this.objetoCadastro;
    for (let index = 0; index < campoStrs.length; index++) {
      const campoStr = campoStrs[index];
      if (validador.isObejetoId && index + 1 === campoStrs.length) {
        valor = valor[campoStr] ? valor[campoStr]['id'] : valor[campoStr];
      } else {
        valor = valor[campoStr];
      }
      if (!valor) {
        break;
      }
    }
    return this.ajustarValor(valor, validador);
  }

  campoTrim(validador) {
    const campoStrs = validador.campoStr.split('.');
    let objeto = this.objetoCadastro;
    let atributo = '';
    for (let index = 0; index < campoStrs.length - 1; index++) {
      const campoStr = campoStrs[index];
      atributo = campoStrs[index + 1];
      objeto = objeto[campoStr];
      if (!objeto) {
        return;
      }
    }
    if (
      objeto[atributo] &&
      objeto[atributo] !== null &&
      typeof objeto[atributo] === 'string'
    ) {
      objeto[atributo] = objeto[atributo].trim();
    }
  }

  mostrarCampoComErro(validador, msgErro = 'Campo Obrigatório!') {
    if (!this.error) {
      this.error = {};
    }
    if (!this.error[validador.campoStr]) {
      this.error[validador.campoStr] = msgErro;
    } else {
      this.error[validador.campoStr] = msgErro;
    }

    if (!this.error.abaNome) {
      this.error.abaNome = validador.abaNome;
    }

    if (!this.error.focus) {
      this.error.focus = validador.campoStr;
    }
  }

  setErro(campo, msgErro, abaNome = undefined) {
    if (!this.error) {
      this.error = {};
    }
    this.error[campo] = msgErro;
    if (!abaNome) {
      this.error.abaNome = abaNome;
    }
  }
}
