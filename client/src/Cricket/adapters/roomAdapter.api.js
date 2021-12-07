import { Env } from "../../env/Env";

export const roomAdapterApi = {
  getAllRoomActions: async ({ http = httpHeroku } = {}) =>
    await http.get("/room/actions"),
};

const httpHeroku = {
  get: async (path) => {
    const reponse = await fetch(`${Env.COOL_DARTS_HTTP_HOST}${path}`);
    return JSON.parse(await reponse.text());
  },
};
