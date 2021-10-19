import Api from './Api';

export default {
  async getStreetTypes() {
    try {
      const response = await Api.get('/list-street-types');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
};
