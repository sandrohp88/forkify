// backwards compatibility with older browsers
import axios from "axios";
import { proxy, key, food2ForkGet, food2ForkSearch } from "../../config";
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const response = await axios(
        `${proxy}${food2ForkSearch}key=${key}&q=${this.query}`
      );
      this.recipes = response.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
