import React from "react";

import playerStore from "../../../stores/player";
import { useRecoilState } from "recoil";

import classnames from "classnames";

import styles from "./PlayerControls.module.scss";

import PlayerControl from "./PlayerControl";
import PlayerControlSpacer from "./PlayerControlSpacer";

import Play from "../../Icons/Play";
import Pause from "../../Icons/Pause";
import Prev from "../../Icons/Prev";
import Next from "../../Icons/Next";
import PlaybackRate from "../../Icons/PlaybackRate";
import List from "../../Icons/List";

const PlayerControls = ({ episodesListLoading, showEpisodesListButtonFn }) => {
  const [playerState] = useRecoilState(playerStore);

  const {
    playing,
    seeking,
    loading,
    playbackRate,
    minus15,
    playPause,
    plus15,
    togglePlaybackRate,
  } = playerState;

  const hasShowEpisodesListButtonFn =
    typeof showEpisodesListButtonFn === "function";

  return (
    <div className={styles.controls}>
      <PlayerControl Icon={Prev} title="-15s" onClick={minus15} />
      <PlayerControl
        Icon={playing ? Pause : Play}
        title={playing ? "Pause" : "Play"}
        primary={true}
        className={classnames(styles.pulse_animation, {
          [styles.on]: !playing && (seeking || loading),
        })}
        onClick={playPause}
      />
      <PlayerControl Icon={Next} title="+15s" onClick={plus15} />
      <PlayerControlSpacer />
      <PlayerControl
        Icon={PlaybackRate}
        rate={playbackRate}
        onClick={togglePlaybackRate}
      />
      {episodesListLoading || hasShowEpisodesListButtonFn ? (
        <PlayerControl
          Icon={List}
          title="Liste des épisodes"
          className={classnames(styles.pulse_animation, {
            [styles.on]: episodesListLoading,
          })}
          onClick={() => episodesListLoading ?? showEpisodesListButtonFn()}
        />
      ) : null}
    </div>
  );
};

export default PlayerControls;
