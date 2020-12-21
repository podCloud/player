import React from "react";
import { useRecoilState } from "recoil";
import classnames from "classnames";

import styles from "./EpisodesListItem.module.scss";

import playerStore from "../../stores/player";

import { convertHMS } from "../../utils";

import { useTranslation } from "react-i18next";

import PlayIcon from "../Icons/Play";
import PauseIcon from "../Icons/Pause";
import PlayingIcon from "../Icons/Playing";

const EpisodesListItem = ({ episode, setCurrentEpisode }) => {
  const { t } = useTranslation();

  const [playerState] = useRecoilState(playerStore);

  const { src: playerSrc, playing, playPause } = playerState;

  const currently_me = episode.enclosure_url === playerSrc;

  function playPauseMe() {
    if (currently_me) {
      playPause();
    } else {
      setCurrentEpisode(episode);
    }
  }

  return episode.enclosure_url ? (
    <div
      className={classnames(styles.episode, {
        [styles.playing]: currently_me && playing,
      })}
      onClick={playPauseMe}
    >
      <div className={styles.cover_wrapper}>
        <img
          src={episode.cover.small_url}
          alt={episode.title}
          className={styles.cover}
        />
        {currently_me && playing ? (
          <div className={styles.currently_playing}>
            <PlayingIcon />
          </div>
        ) : null}
        <div
          className={styles.button}
          aria-label={
            currently_me && playing
              ? t("pause")
              : currently_me
              ? t("resume")
              : t("play")
          }
        >
          {currently_me && playing ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.title}>{episode.title}</div>
        <div className={styles.meta}>
          <div className={styles.published}>
            {episode.published_at.toLocaleDateString()}
          </div>
          <div className={styles.duration}>
            {convertHMS(episode.enclosure_duration)}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EpisodesListItem;
