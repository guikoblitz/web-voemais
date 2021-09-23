import { Notify } from 'quasar';

export function notificarSucesso(texto: string): void {
  Notify.create({
    classes: 'notify-class-sucesso',
    position: 'top',
    multiLine: true,
    progress: true,
    message: texto,
    icon: 'fas fa-thumbs-up',
    timeout: 5000,
    actions: [
      {
        label: 'Ok',
        color: 'green-10',
        handler: () => {}
      }
    ]
  });
}

export function notificarErro(texto: string): void {
  Notify.create({
    classes: 'notify-class-erro',
    position: 'top',
    multiLine: true,
    progress: true,
    message: texto,
    icon: 'fas fa-thumbs-down',
    timeout: 5000,
    actions: [
      {
        label: 'Ok',
        color: 'red-10',
        handler: () => {}
      }
    ]
  });
}

export function notificarAlerta(texto: string): void {
  Notify.create({
    classes: 'notify-class-alerta',
    position: 'top',
    multiLine: true,
    progress: true,
    message: texto,
    icon: 'warning',
    timeout: 5000,
    actions: [
      {
        label: 'Ok',
        color: 'brown-6',
        handler: () => {}
      }
    ]
  });
}
