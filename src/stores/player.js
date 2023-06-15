import { atom } from "recoil";

const playerState = atom({
  key: "player",
  default: {
    hasVideo: false,
    duration: 0,
    currentTime: 0,
    percent: 0.0,
    paused: true,
    ended: false,
    playbackRate: 1.0,
    networkState: false,
    readyState: false,
    muted: false,
    loading: false,
    playing: false,
    src: null,
    should_autoplay: false,
    minus15: () => console.log("No player ref yet"),
    plus15: () => console.log("No player ref yet"),
    play: () => console.log("No player ref yet"),
    pause: () => console.log("No player ref yet"),
    playPause: () => console.log("No player ref yet"),
    seekToPercent: () => console.log("No player ref yet"),
    togglePlaybackRate: () => console.log("No player ref yet"),
    toggleFullscreen: () => console.log("No player ref yet"),
  },
});

export default playerState;
