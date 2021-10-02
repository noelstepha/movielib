'use strict';

const { addLikes } = require('../services/movie');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findOne: async (ctx) => {
    const id = ctx.params.id;

    let movie = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) { //is mongodb id
      movie = await strapi.services.movie.findOne({ id });
    } else {
      movie = { moviedb_id: id }
    }

    if (!movie) {
      return ctx.badRequest("[movielib] Error while finding a movie")
    }

    try {
      const fullmovie = await strapi.config.functions.moviedb.movie.get(movie.moviedb_id);

      return {...fullmovie, id: movie.id, moviedb_id: movie.moviedb_id, rating : movie.rating};
    } catch(e) {
      return ctx.badRequest(e)
    }
  },

  explore: async ({ query }) => {
    try {
      const page = await strapi.config.functions.moviedb.movie.search(query);
      await addLikes(page.results);

      return page;
    } catch(e) {
      return ctx.badRequest(e)
    }
  },

  recommendations: async (ctx) => {
    const id = ctx.params.id;

    let movie = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) { //is mongodb id
      movie = await strapi.services.movie.findOne({ id });
    } else {
      movie = { moviedb_id: id }
    }

    if (!movie) {
      return ctx.badRequest("[movielib] Movie not found")
    }

    try {
      const page = await strapi.config.functions.moviedb.movie.recommendations({
        id: movie.moviedb_id,
        page : ctx.query.page
      });
      await addLikes(page.results);

      return page;
    } catch(e) {
      return ctx.badRequest(e)
    }

  }
};
