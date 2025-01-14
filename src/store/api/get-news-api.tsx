import { api } from ".";
import { API_KEY } from "../../hook/useEnv";

export const getNews = api.injectEndpoints({
  endpoints: (build) => ({
    getNews: build.query({
      query: (text) => ({
        url: `${text}&apiKey=${API_KEY}`,
      }),
    }),
  }),
});

export const { useGetNewsQuery } = getNews;
