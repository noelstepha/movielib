'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async ({ query }) => {
    const movie = await strapi.services.movie.findOne(query);

    const fullmovie = await strapi.config.functions.moviedb.movie.get(movie.moviedb_id);

    return {...fullmovie, rating : movie.rating};
  },

  explore: async ({ query }) => {
    const page = await strapi.config.functions.moviedb.movie.search(query);
    const ids = page.results.map(m => String(m.id));
    const movieById =  page.results.reduce((map, m) => {
      map[m.id] = m;
      return map
    }, {});

    const liked = await strapi.services.movie.find({ moviedb_id_in : ids });

    liked.forEach(m => {
      movieById[m.moviedb_id].liked = true;
    });

    return page;
  }
};
