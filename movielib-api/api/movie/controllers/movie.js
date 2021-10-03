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
      movie.liked = true;
    } else {
      movie = { moviedb_id: id, liked: false };
    }

    if (!movie) {
      return ctx.badRequest("[movielib] Error while finding a movie");
    }

    try {
      const fullmovie = await strapi.config.functions.moviedb.movie.get(movie.moviedb_id);

      return {
        ...fullmovie,
        id: movie.id,
        moviedb_id: movie.moviedb_id,
        rating : movie.rating,
        liked: movie.liked
      };
    } catch(e) {
      return ctx.badRequest(e);
    }
  },

  explore: async (ctx) => {
    try {
      const page = await strapi.config.functions.moviedb.movie.search(ctx.query);
      await addLikes(page.results);

      return page;
    } catch(e) {
      return ctx.badRequest(e);
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
      return ctx.badRequest(e);
    }
  },

  rate: async (ctx) => {
    const id = ctx.params.id;
    const rating = ctx.request.body.rating;

    return strapi.services.movie.update({ id }, { rating });
  }
};
