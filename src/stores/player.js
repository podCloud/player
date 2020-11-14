import { atom } from "recoil";

const playerState = atom({
  key: "player",
  default: {
    currentItem: null,
    podcast: null,
    player: {
      currentTime: 0,
    },
  },
});

export default playerState;
