import { atom } from "recoil";

const playerState = atom({
  key: "player",
  default: {
    hasVideo: false,
    duration: 0,
    currentTime: 0,
    paused: true,
    ended: false,
    networkState: false,
    readyState: false,
    muted: false,
      loading: false,
    playing: false,
  },
});

export default playerState;
