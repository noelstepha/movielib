'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (ctx) => {
    const movie = await strapi.services.movie.findOne(ctx.query);

    const fullmovie = await strapi.config.functions.moviedb.movie.get(movie.moviedb_id);

    return {...fullmovie, rating : movie.rating};
  }
};
