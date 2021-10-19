import Api from './Api';

export default {
  async getPhoneTypes() {
    try {
      const response = await Api.get('/list-phone-types');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
};
