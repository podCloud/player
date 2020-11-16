import React from "react";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

const PlayerControls = ({
  playerRef,
  showEpisodesListButton,
  showEpisodeListButtonFn,
}) => {
  const [playerState] = useRecoilState(playerStore);

  const { playing, seeking, loading } = playerState;

  const player = playerRef.current;

  function moins15() {
    player.currentTime = player.currentTime - 15;
    if (player.paused) {
      player.play();
    }
  }

  function plus15() {
    player.currentTime = player.currentTime + 15;
    if (player.paused) {
      player.play();
    }
  }

  function togglePlayPause() {
    if (player.seeking || player.networkSate === 2) {
      console.log("ignoring playPause when loading");
      return false;
    }

    if (!player.paused && !player.ended) {
      player.pause();
    } else {
      player.play();
    }
  }

  return (
    <div className="controls">
      <img src={"/backward.svg"} alt="-15s" onClick={moins15} />
      <img
        id="playButton"
        src={playing || seeking || loading ? "/pause.svg" : "/play.svg"}
        alt={playing || seeking || loading ? "Pause" : "Play"}
        style={{ opacity: seeking || loading ? 0.2 : 1 }}
        onClick={togglePlayPause}
      />
      <img src={"/forward.svg"} alt="+15s" onClick={plus15} />
      {showEpisodesListButton ? (
        <img
          src={"/list.svg"}
          alt="Liste des épisodes"
          onClick={showEpisodeListButtonFn}
        />
      ) : null}
    </div>
  );
};

export default PlayerControls;
