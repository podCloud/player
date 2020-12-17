import React, { useState, useEffect } from "react";

import { resizeFrame, isPlayerPortrait } from "../utils";

import EpisodesList from "./EpisodesList";

import EpisodeTitle from "./EpisodeTitle";
import PodcastTitle from "./PodcastTitle";

import BackgroundCover from "./BackgroundCover";

import MediaPlayer from "./MediaPlayer";

import PodCloud from "./Icons/PodCloud";

import classnames from "classnames";
import styles from "./Player.module.scss";

import {
  PlayerProgressBar,
  PlayerTimecodes,
  PlayerControls,
} from "./PlayerElements";

const Player = ({
  currentEpisode,
  currentPodcast,
  episodesList,
  episodesListOpened,
  setCurrentEpisode,
}) => {
  const [episodesListVisible, setEpisodesListVisible] = useState(false);
  const hasEpisodes = episodesList?.length > 0;
  const showEpisodesListBtn = episodesList?.loading || hasEpisodes;

  useEffect(() => {
    if (episodesListOpened && hasEpisodes) {
      if (!isPlayerPortrait()) {
        setEpisodesListVisible(true);
      }
    }
  }, [episodesListOpened, hasEpisodes]);

  const showHideEpisodesList = (open) => {
    resizeFrame(open);
    window.setTimeout(() => setEpisodesListVisible(open), 150);
    window.setTimeout(() => resizeFrame(open), 1000);
  };

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.episode_list_opened]: episodesListVisible,
      })}
      player-wrapper="true"
    >
      <div className={styles.all_player}>
        {/* eslint-disable react/jsx-no-target-blank */}
        <a
          href={currentEpisode.podcloud_url ?? "https://podcloud.fr"}
          target="_blank"
          style={{ zIndex: 1000 }}
        >
          <PodCloud className={styles.podcloud_logo} noOutline={true} />
        </a>
        {/* eslint-enable react/jsx-no-target-blank */}
        <MediaPlayer currentEpisode={currentEpisode} />
        <div className={styles.player}>
          <div className={styles.head}>
            <EpisodeTitle currentEpisode={currentEpisode} />
            <PodcastTitle currentPodcast={currentPodcast} />
          </div>
          <PlayerTimecodes
            initialDuration={currentEpisode.enclosure_duration}
          />
          <PlayerProgressBar />
          <PlayerControls
            episodesListLoading={episodesList?.loading}
            showEpisodesListButtonFn={
              showEpisodesListBtn
                ? () => {
                    showHideEpisodesList(!episodesListVisible);
                  }
                : null
            }
          />
        </div>
      </div>
      {showEpisodesListBtn ? (
        <EpisodesList
          episodesList={episodesList}
          setCurrentEpisode={(...args) => {
            setCurrentEpisode(...args);
            if (isPlayerPortrait()) {
              showHideEpisodesList(false);
            }
          }}
          open={episodesListVisible}
          closeFn={() => showHideEpisodesList(false)}
        />
      ) : null}
      <BackgroundCover currentEpisode={currentEpisode} />
    </div>
  );
};

export default Player;
