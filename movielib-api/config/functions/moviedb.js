const axios = require('axios');
const keyparams = '?api_key=' + process.env.MOVIEDB_API_KEY;
const apiurl =  process.env.MOVIEDB_API_URL;

module.exports = {
  movie : {
    get: async (id) => {
      const response = await axios.get(apiurl + 'movie/' + id + keyparams);

      if (response.status === 200) {
        return response.data
      }

      // TO DO Manage all status
      return response
    },

    search: async (keywords) => {
      const response = await axios.get(apiurl + 'search/movie' + keyparams + '&query=' + keywords);
      if (response.status === 200) {
        return response.data
      }

      // TO DO Manage all status
      return response
    }
  }
};
