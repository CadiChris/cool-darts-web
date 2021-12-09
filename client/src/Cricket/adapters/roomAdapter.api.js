import { Env } from "../../env/Env";

export const roomAdapterApi = {
  getAllRoomActions: async ({ http = httpHeroku } = {}) =>
    (await http.get("/room/actions")) || [],

  cleanRoom: async ({ http = httpHeroku } = {}) =>
    await http.post("/room/clean"),
};

const httpHeroku = {
  get: async (path) => {
    const url = `${Env.COOL_DARTS_HTTP_HOST}${path}`;
    const reponse = await fetch(url);
    return JSON.parse(await reponse.text());
  },

  post: async (path) => {
    const url = `${Env.COOL_DARTS_HTTP_HOST}${path}`;
    return await fetch(url, { method: "POST" });
  },
};
