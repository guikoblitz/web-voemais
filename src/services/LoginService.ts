import { UserLogin } from 'src/entities/UserLogin';
import Api from './Api';

export default {
    async provideLogin(login: UserLogin) {
        try {
            const response = await Api.post('/login', login);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
};
