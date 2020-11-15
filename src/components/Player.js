import React, { useRef, useState, useEffect } from "react";

import playerStore from "../stores/player";
import episodeStore from "../stores/episode";

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

const Player = () => {
  const [episodeListVisible, setEpisodeListVisible] = useState(false);

  const audioPlayer = useRef(undefined);

  const [playerState, setPlayerState] = useRecoilState(playerStore);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener("timeupdate", function (ev) {
        setPlayerState({
          ...playerState,
          currentTime: ev.target.currentTime,
          duration: ev.target.duration,
        });
      });
    }
  }, [audioPlayer, setPlayerState, playerState]);

  const [episodeState] = useRecoilState(episodeStore);

  const { enclosure_url, enclosure_duration } = episodeState;

  useEffect(() => {
    if (audioPlayer.current) {
      const audioSrc = enclosure_url;

      if (audioPlayer.current.src !== audioSrc) {
        audioPlayer.current.src = audioSrc;
        audioPlayer.current.play();
      }
    }
  }, [audioPlayer, enclosure_url]);

  return (
    <div className="player">
      <div className="playerHead">
        <audio ref={audioPlayer} hidden preload="none" />
        <EpisodeCover />
        <div className="rightDivPlayer">
          <EpisodeTitle />
          <PodcastTitle />
          <PlayerProgressBar playerRef={audioPlayer} />
          <PlayerAudioTimer
            playerRef={audioPlayer}
            initialDuration={enclosure_duration}
          />
          <PlayerControls
            playerRef={audioPlayer}
            showEpList={() => setEpisodeListVisible((current) => !current)}
          />
        </div>
      </div>
      {episodeListVisible ?? <EpisodeList />}
    </div>
  );
};

export default Player;
