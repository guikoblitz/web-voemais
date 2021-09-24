import Api from './Api';

export default {
  async getTravelPackagesTypes() {
    try {
      const response = await Api.get('/list-travel-package-types');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
};
