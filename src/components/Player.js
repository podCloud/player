import React, { useState } from "react";

import EpisodesList from "./EpisodesList";

import EpisodeCover from "./EpisodeCover";
import EpisodeTitle from "./EpisodeTitle";
import PodcastTitle from "./PodcastTitle";

import BackgroundCover from "./BackgroundCover";

import MediaPlayer from "./MediaPlayer";

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
  setCurrentEpisode,
}) => {
  const [episodesListVisible, setEpisodesListVisible] = useState(false);
  const showEpisodesList = episodesList?.loading || episodesList?.length > 0;

  return (
    <div className={styles.wrapper}>
      <MediaPlayer mediaUrl={currentEpisode.enclosure_url} />
      <EpisodeCover currentEpisode={currentEpisode} />
      <div className={styles.player}>
        <div className={styles.head}>
          <div className={styles.titles}>
            <EpisodeTitle currentEpisode={currentEpisode} />
            <PodcastTitle currentPodcast={currentPodcast} />
          </div>
        </div>
        <PlayerTimecodes initialDuration={currentEpisode.enclosure_duration} />
        <PlayerProgressBar />
        <PlayerControls
          episodesListLoading={episodesList?.loading}
          showEpisodesListButtonFn={
            showEpisodesList
              ? () => {
                  setEpisodesListVisible((current) => {
                    return !current;
                  });
                }
              : null
          }
        />
      </div>
      {showEpisodesList ? (
        <EpisodesList
          episodesList={episodesList}
          setCurrentEpisode={setCurrentEpisode}
          open={episodesListVisible}
        />
      ) : null}
      <BackgroundCover currentEpisode={currentEpisode} />
    </div>
  );
};

export default Player;
