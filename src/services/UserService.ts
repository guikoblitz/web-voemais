import { User } from 'src/entities/User';
import Api from './Api';

export default {
    async getUserById(id_user: string) {
        try {
            const response = await Api.get(`/get-user/${id_user}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },

    async createUser(user: User): Promise<User> {
        try {
            const response = await Api.post('/users', user);
            return response.data;
        } catch (e) {
            throw e;
        }
    },

    async updateUser(user: User): Promise<User> {
        try {
            const id = user.id_user;
            const response = await Api.put(`/update-user/${id}`, user);
            console.log(response);
            return response.data;
        } catch (e) {
            throw e;
        }
    },

    async deleteUser(user: User): Promise<User> {
        try {
            const response = await Api.delete(`/delete-user/${user.id_user}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
};
