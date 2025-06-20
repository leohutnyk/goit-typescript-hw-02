import axios from "axios";

const ACCESS_KEY = "v2vQTrXbyDzcqvEXTKuO8vc6HDjsQov7FkTdJF-pWrE";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${ACCESS_KEY}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

axios.defaults.params = {
  per_page: 12,
  orientation: "landscape",
};

const fetchImages = async (query: string, page: number) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export default fetchImages;
