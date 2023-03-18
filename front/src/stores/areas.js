import { defineStore } from 'pinia';
import axios from "axios";

// const url = "http://18.141.205.103:3001/api/v0/";
const url = import.meta.env.VITE_API_URL + "api/v0/";
const url2 = import.meta.env.VITE_API_URL2 + "api/v0/";

export const useStore = defineStore('areas', {
  state: () => ({
    areas: [],
    searchState: [],
    areaByLocality: [],
  }),
  getters: {
    getAreas(state) {
      return state.areas;
    },
    getAreaById: (state) => (id) => {
      return state?.areaByLocality?.find(area => area?._id === id);
    },
    getSearch(state) {
      return state.searchState;
    },
    getLocalityById: (state) => (id) => {
      if (state.areas.length === 0) {
        return [];
      }

      const areas = state.areas.filter(area => area.fullLocation.locality === id);

      if (areas.length === 0) {
        const areas = state.areas.filter(area => area.fullLocation.formatted_address.includes(id));
        return areas;
      }

      state.isLoading = true;
      return areas;
    }
  },
  actions: {
    async getAllAreas() {
      try {
        const response = await axios.get(url + "areas");
        this.areas = response.data;
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getAreaByLocality(area) {
      try {
        console.log(area, 'area')
        // area is 
        const response = await axios.get(url + "areas/" + area);
        this.areaByLocality = response.data;
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async searchArea(payload) {
      try {
        console.log(payload, 'payload');
        if (Object.keys(payload).length === 0) {
          this.getAllAreas();
        }
        const payloadString = Object.keys(payload).filter(key => typeof (payload[key]) === 'string' && payload[key] !== '').map(key => key + '=' + payload[key]).join('&');
        const response = await axios.get(url + "search?" + payloadString);
        this.searchState = response.data;
        return response.data;
      } catch (error) {
        console.log(error)
      }
    },
  }
})
