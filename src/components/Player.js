import React, { useRef, useState, useEffect } from "react";

import playerStore from "../stores/player";

import { useRecoilState } from "recoil";

import EpisodeList from "./EpisodeList";

import PodcastTitle from "./PodcastTitle";
import EpisodeTitle from "./EpisodeTitle";
import EpisodeCover from "./EpisodeCover";

import {
  PlayerProgressBar,
  PlayerAudioTimer,
  PlayerControls,
} from "./PlayerElements";

const Player = ({ currentEpisode, episodesList, setCurrentEpisode }) => {
  const player = useRef();

  const [playerState, setPlayerState] = useRecoilState(playerStore);

  useEffect(() => {
    const ref = player.current;
    if (ref && ref.dataset.boundEvents !== "did") {
      ref.dataset.boundEvents = "did";

      (
        "loadstart progress suspend abort error " +
        "emptied stalled loadedmetadata loadeddata canplay canplaythrough " +
        "playing waiting seeking seeked ended durationchange " +
        "timeupdate play pause ratechange resize volumechange"
      )
        .split(" ")
        .forEach((ev) => {
          ref.addEventListener(ev.trim(), (e) => {
            setPlayerState({
              ...playerState,
              hasVideo: ref.videoWidth > 0 || ref.videoHeight > 0,
              duration: ref.duration,
              currentTime: ref.currentTime,
              paused: ref.paused,
              ended: ref.ended,
              networkState: ref.networkState,
              readyState: ref.readyState,
              muted: ref.muted,
              loading: ref.networkState === 2,
              playing: !(ref.ended || ref.seeking || ref.paused),
            });
          });
        });
    }
  }, [player, setPlayerState, playerState]);

  useEffect(() => {
    if (player.current) {
      const audioSrc = currentEpisode.enclosure_url;

      if (player.current.src !== audioSrc) {
        player.current.src = audioSrc;
        player.current.play();
      }
    }
  }, [player, currentEpisode.enclosure_url]);

  const [episodesListVisible, setEpisodesListVisible] = useState(false);
  const showEpisodeListButton =
    Array.isArray(episodesList) && episodesList.length > 0;

  return (
    <div className="player">
      <div className="playerHead">
        <video ref={player} hidden preload="none" />
        <EpisodeCover currentEpisode={currentEpisode} />
        <div className="rightDivPlayer">
          <EpisodeTitle currentEpisode={currentEpisode} />
          <PodcastTitle currentEpisode={currentEpisode} />
          <PlayerProgressBar playerRef={player} />
          <PlayerAudioTimer
            playerRef={player}
            initialDuration={currentEpisode.duration}
          />
          <PlayerControls
            playerRef={player}
            showEpisodeListButton={showEpisodeListButton}
            showEpisodeListButtonFn={() =>
              setEpisodesListVisible((current) => !current)
            }
          />
        </div>
      </div>
      {showEpisodeListButton && episodesListVisible ? (
        <EpisodeList
          episodesList={episodesList}
          setCurrentEpisode={setCurrentEpisode}
        />
      ) : null}
    </div>
  );
};

export default Player;
