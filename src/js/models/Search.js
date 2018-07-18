// backwards compatibility with older browsers
import axios from "axios";
// food2fork API key b9f8ebc5a7a8fd437e53ad47da4cee51
// All search requests should be made to the base search API URL. http://food2fork.com/api/search
// All recipe requests should be made to this URL: http://food2fork.com/api/get
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = "b9f8ebc5a7a8fd437e53ad47da4cee51";
    try {
      const response = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      this.recipes = response.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
