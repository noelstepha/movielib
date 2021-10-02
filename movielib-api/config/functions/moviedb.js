const axios = require('axios');
const keyparams = '?api_key=' + process.env.MOVIEDB_API_KEY;
const apiurl =  process.env.MOVIEDB_API_URL;

module.exports = {
  movie : {
    get: async (id) => {
      const response = await axios
        .get(apiurl + 'movie/' + id + keyparams)
        .catch(e => {
            throw "[movielib] Error while fetching a movie"
          });

      if (response.status === 200) {
        return response.data
      }

      throw "[movielib] Error while fetching a movie"
    },

    search: async ({ search, page }) => {
      const response = await axios
        .get(apiurl + 'search/movie' + keyparams + '&query=' + search + (page ? "&page=" + page : ""))
        .catch(e => {
          throw "[movielib] Error while fetching movies"
        });

      if (response.status === 200) {
        return response.data
      }

      throw "[movielib] Error while fetching movies"
    },

    recommendations: async ({ id, page }) => {
      const response = await axios
        .get(apiurl + 'movie/' + id + '/recommendations' + keyparams + (page ? "&page=" + page : ""))
        .catch(e => {
          throw "[movielib] Error while fetching recommendations"
        });

      if (response.status === 200) {
        return response.data
      }

      throw "[movielib] Error while fetching recommendations"
    }
  }
};
