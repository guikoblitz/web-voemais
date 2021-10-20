export class User {
    id_user: string;

    cpf: string;

    name: string;

    last_name: string;

    email: string;

    employee: boolean;

    date_birth: Date | string;

    password: string;

    password_confirmation?: string;

    id_country: string;

    name_state: string;

    name_city: string;

    name_neighborhood: string;

    id_street: string;

    name_address: string;

    num_address: string;

    complement: string;

    cep: string;

    id_phone_type: string;

    num_phone: string;

    created_at: Date;

    updated_at: Date;
}
