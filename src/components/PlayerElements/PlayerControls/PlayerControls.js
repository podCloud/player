import React from "react";

import playerStore from "../../../stores/player";
import { useRecoilState } from "recoil";

import classnames from "classnames";

import { useTranslation } from "react-i18next";

import styles from "./PlayerControls.module.scss";

import PlayerControl from "./PlayerControl";

import Play from "../../Icons/Play";
import Pause from "../../Icons/Pause";
import Prev from "../../Icons/Prev";
import Next from "../../Icons/Next";
import PlaybackRate from "../../Icons/PlaybackRate";
import List from "../../Icons/List";
import FullScreen from "../../Icons/FullScreen";

const PlayerControls = ({
  episodesListLoading,
  showEpisodesListButtonFn,
  episodesListOpened,
}) => {
  const [playerState] = useRecoilState(playerStore);
  const { t } = useTranslation();

  const {
    playing,
    seeking,
    loading,
    playbackRate,
    minus15,
    playPause,
    plus15,
    hasVideo,
    togglePlaybackRate,
    toggleFullscreen,
  } = playerState;

  const hasShowEpisodesListButtonFn =
    typeof showEpisodesListButtonFn === "function";

  return (
    <div className={styles.controls}>
      <PlayerControl Icon={Prev} title={t("minus15")} onClick={minus15} />
      <PlayerControl
        Icon={playing ? Pause : Play}
        title={playing ? t("pause") : t("play")}
        className={classnames(styles.play_pause, styles.pulse_animation, {
          [styles.on]: seeking || loading,
          [styles.pause]: playing,
        })}
        onClick={playPause}
      />
      <PlayerControl Icon={Next} title={t("plus15")} onClick={plus15} />
      {hasVideo && (
        <PlayerControl
          Icon={FullScreen}
          title={t("fullscreen")}
          onClick={toggleFullscreen}
        />
      )}
      <PlayerControl
        Icon={PlaybackRate}
        rate={playbackRate}
        title={t("change_speed")}
        onClick={togglePlaybackRate}
      />
      {episodesListLoading || hasShowEpisodesListButtonFn ? (
        <PlayerControl
          Icon={List}
          title={t("episodes_list")}
          className={classnames(
            styles.episodes_list_button,
            styles.pulse_animation,
            {
              [styles.on]: episodesListLoading,
              [styles.hide_on_horizontal]: episodesListOpened,
            }
          )}
          onClick={() => episodesListLoading ?? showEpisodesListButtonFn()}
        />
      ) : null}
    </div>
  );
};

export default PlayerControls;
