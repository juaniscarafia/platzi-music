import configService from "./config";
import axios from "axios";

const trackService = {};

// import platziMusicService from "./platzi-music";
// trackService.search = function(q) {
//     const type = 'tracks'

//     return platziMusicService.get('/search', {
//         params: { q, type },
//         Headers: configService.options.headers
//     }).then(res => res.data)
// }

trackService.search = async function (q) {
  const type = "tracks";
  return await axios
    .get(`${configService.apiUrl}/search/`, {
      params: {
        q,
        type,
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: configService.options.headers,
    })
    .then((res) => res.data)
    .catch((error) => error);
};

trackService.getById = async function (id) {
  return await axios
    .get(`${configService.apiUrl}/tracks/`, {
      params: {
        ids: id,
      },
      headers: configService.options.headers,
    })
    .then(res => res.data)
    .catch(error => error);
};

export default trackService;
