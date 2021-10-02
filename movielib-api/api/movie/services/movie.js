'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  addLikes: async (movies) => {
    const ids = movies.map(m => String(m.id));
    const movieById =  movies.reduce((map, m) => {
      map[m.id] = m;
      return map
    }, {});

    const liked = await strapi.services.movie.find({ moviedb_id_in : ids });

    liked.forEach(m => {
      movieById[m.moviedb_id].liked = true;
    });
  }
};
