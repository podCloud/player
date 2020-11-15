import { atom } from "recoil";

const playerState = atom({
  key: "player",
  default: {
    currentTime: 0,
    duration: 0,
  },
});

export default playerState;
