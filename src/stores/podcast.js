import { atom } from "recoil";

const podcastState = atom({
  key: "podcast",
  default: {},
});

export default podcastState;
