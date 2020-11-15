import React from "react";

const PlayerControls = ({ playerRef, showEpisodeList }) => {

  function moins15() {
    playerRef.current.currentTime = playerRef.current.currentTime - 15;
  }

  function plus15() {
    playerRef.current.currentTime = playerRef.current.currentTime + 15;
  }

  return (
    <div className="controls">
      <img src={"/backward.svg"} alt="-15s" onClick={moins15} />
      <img
        id="playButton"
        src={!playerRef.current?.paused ? "/pause.svg" : "/play.svg"}
        alt={
          playerRef.current?.paused
            ? "Lecture"
            : "Pause"
        }
        onClick={() =>
          playerRef.current &&
          (playerRef.current.paused
            ? playerRef.current.play()
            : playerRef.current.pause())
        }
      />
      <img src={"/forward.svg"} alt="+15s" onClick={plus15} />
      <img src={"/list.svg"} alt="Liste des épisodes" onClick={showEpisodeList} />
    </div>
  );
};

export default PlayerControls;
