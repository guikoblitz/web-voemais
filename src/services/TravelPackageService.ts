import { TravelPackage } from 'src/entities/TravelPackage';
import state from 'src/store/geral/state';
import { notificarAlerta } from 'src/util/NotifyUtil';
import Api from './Api';

export default {
    async createTravelPackage(travelPackage: TravelPackage): Promise<TravelPackage | void> {
        try {
            const token = state.tokenUsuarioLogado;
            if (token) {
                const response = await Api.post('/create-travel-package', travelPackage, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data.travelPackages;
            } else {
                notificarAlerta('É preciso estar logado como Funcionário para realizar esta ação.');
                return undefined;
            }
        } catch (e) {
            throw e;
        }
    },

    async getTravelPackages() {
        try {
            const response = await Api.get('/list-travel-packages');
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    },

    async getTravelPackageId(travelPackage: TravelPackage) {
        try {
            const response = await Api.get(`/list-travel-packages/${travelPackage.id_travel_pack}`);
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    },

    async updateTravelPackage(travelPackage: TravelPackage): Promise<TravelPackage | void> {
        try {
            const token = state.tokenUsuarioLogado;
            if (token) {
                const id = travelPackage.id_travel_pack;
                const response = await Api.put(`/update-travel-packages/${id}`, travelPackage, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            } else {
                notificarAlerta('É preciso estar logado como Funcionário para realizar esta ação.');
                return undefined;
            }
        } catch (e) {
            throw e;
        }
    },

    async deleteTravelPackage(travelPackage: TravelPackage): Promise<TravelPackage | void> {
        try {
            const token = state.tokenUsuarioLogado;
            if (token) {
                const response = await Api.delete(`/delete-travel-packages/${travelPackage.id_travel_pack}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            } else {
                notificarAlerta('É preciso estar logado como Funcionário para realizar esta ação.');
                return undefined;
            }
        } catch (e) {
            throw e;
        }
    }
};
// continuação 1:03:25 - https://www.youtube.com/watch?v=UysSATJ8wb0
