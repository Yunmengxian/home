import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      imgLoadStatus: false,
      innerWidth: null,
      coverType: "0",
      siteStartShow: false,
      footerBlur: true,
      backgroundShow: false,
      boxOpenState: false,
      mobileOpenState: false,
      mobileFuncState: false,
      setOpenState: false,
    };
  },
  getters: {
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "siteStartShow",
      "footerBlur",
    ],
  },
});
