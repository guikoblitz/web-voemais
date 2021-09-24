import { TravelPackage } from 'src/entities/TravelPackage';
import Api from './Api';

export default {
  async createTravelPackage(
    travelPackage: TravelPackage
  ): Promise<TravelPackage> {
    try {
      const response = await Api.post('/create-travel-package', travelPackage);
      return response.data.travelPackages;
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
      const response = await Api.get(
        `/list-travel-packages/${travelPackage.id_travel_pack}`
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updateTravelPackage(travelPackage: TravelPackage) {
    try {
      const id = travelPackage.id_travel_pack;
      const response = await Api.put(
        `/update-travel-packages/${id}`,
        travelPackage
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async deleteTravelPackage(travelPackage: TravelPackage) {
    try {
      const response = await Api.delete(
        `/delete-travel-packages/${travelPackage.id_travel_pack}`
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
};
// continuação 1:03:25 - https://www.youtube.com/watch?v=UysSATJ8wb0
