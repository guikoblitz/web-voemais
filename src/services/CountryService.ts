import Api from './Api';

export default {
  async getCountries() {
    try {
      const response = await Api.get('/list-countries');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
};
