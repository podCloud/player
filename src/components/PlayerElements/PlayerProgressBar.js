import React, { useRef } from "react";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

const PlayerProgressBar = ({ playerRef }) => {
  const [playerState] = useRecoilState(playerStore);

  const progressbarRef = useRef();

  const { currentTime, duration } = playerState;

  const percent =
    Math.trunc(((currentTime || 0) / (duration || 1)) * 10000) / 100;

  function updateTime(event) {
    if (playerRef.current && event.target === progressbarRef.current) {
      const percent = event.nativeEvent.offsetX / event.target.offsetWidth;
      playerRef.current.currentTime = percent * playerRef.current.duration;
      console.log(
        "jump to " + percent.toFixed(2) + " : " + playerRef.current.currentTime
      );

      playerRef.current.play();
    } else {
      debugger;
    }
  }

  return (
    <div id="progressbar" ref={progressbarRef} onClick={updateTime}>
      <div
        id="prog"
        style={{ width: percent + "%", pointerEvents: "none" }}
      ></div>
    </div>
  );
};

export default PlayerProgressBar;
