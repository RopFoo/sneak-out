import { z } from 'zod';
import { baseProcedure, router } from '../trpc';

export const moviesRouter = router({
  search: baseProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const searchMoviesResult = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${input.title}`
      );
      const movies = await searchMoviesResult.json();
      return movies;
    }),
});
