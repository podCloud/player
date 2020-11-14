import React from "react";

  const PlayerProgressBar = ({ playerRef }) => {
    const percent =
      Math.trunc(
        ((playerRef.current?.currentTime || 0) /
          (playerRef.current?.duration || 1)) *
          10000
      ) / 100;

    function updateTime(event) {
      let percent = event.nativeEvent.offsetX / event.target.offsetWidth;
      if (playerRef.current) {
        playerRef.current.currentTime = percent * playerRef.current.duration;
      }
    }

    return (
      <div id="progressbar" onClick={updateTime}>
        <div id="prog" style={{ width: percent + "%" }}></div>
      </div>
    );
  };


export default PlayerProgressBar;
