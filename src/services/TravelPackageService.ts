import Api from './Api';

interface ITravelPackage {
  id_travel_pack: string;
  id_travel_package_type: string;
  id_country_origin: string;
  id_country_destination: string;
  name_travel_package: string;
  description: string;
  image: string;
  promotion: boolean;
  start_date: Date;
  end_date: Date;
  unit_price: number;
}

export default {
  async createTravelPackage(travelPackage: ITravelPackage) {
    try {
      const response = await Api.post('/create-travel-package', travelPackage);
      return response.data;
    } catch (error) {
      return console.log(error);
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

  async getTravelPackageId(travelPackage: ITravelPackage) {
    try {
      const response = await Api.get(
        `/list-travel-packages/${travelPackage.id_travel_pack}`
      );
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  },

  async updateTravelPackage(travelPackage: ITravelPackage) {
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

  async deleteTravelPackage(travelPackage: ITravelPackage) {
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
