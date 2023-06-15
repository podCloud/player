import {
  PlayerControls,
  PlayerProgressBar,
  PlayerTimecodes,
} from "./PlayerElements";
import React, { useState } from "react";
import {
  isInFrame,
  isPlayerPortrait,
  resizeFrame,
  useUrlOptions,
} from "../utils";

import BackgroundCover from "./BackgroundCover";
import EpisodeTitle from "./EpisodeTitle";
import EpisodesList from "./EpisodesList";
import MediaPlayer from "./MediaPlayer";
import PodCloud from "./Icons/PodCloud";
import PodcastTitle from "./PodcastTitle";
import classnames from "classnames";
import styles from "./Player.module.scss";

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
  const { fixedSize } = useUrlOptions();

  const showHideEpisodesList = (open) => {
    if (!fixedSize) resizeFrame(open);

    window.setTimeout(() => setEpisodesListVisible(open), 150);

    if (!fixedSize) {
      window.setTimeout(() => resizeFrame(open), 450);
    }
  };

  if (!fixedSize) resizeFrame();

  return (
    <>
      <BackgroundCover currentEpisode={currentEpisode} fullpage={true} />
      <div
        className={classnames(styles.wrapper, {
          [styles.episode_list_keep_opened]: episodesListOpened,
          [styles.episode_list_opened]: episodesListVisible,
          [styles.standalone]: !isInFrame(),
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
              episodesListOpened={episodesListOpened}
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
        {showEpisodesListBtn || episodesListOpened ? (
          <EpisodesList
            episodesList={episodesList}
            setCurrentEpisode={(...args) => {
              setCurrentEpisode(...args);
              if (isPlayerPortrait()) {
                showHideEpisodesList(false);
              }
            }}
            open={episodesListVisible}
            keepOpened={episodesListOpened}
            closeFn={() => showHideEpisodesList(false)}
          />
        ) : null}
        <BackgroundCover currentEpisode={currentEpisode} />
      </div>
    </>
  );
};

export default Player;
