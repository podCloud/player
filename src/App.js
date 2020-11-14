import React, { useRef, useState, useEffect } from "react";

import playerStore from "./stores/player";
import { useRecoilState } from "recoil";

import "./App.css";
import EpisodeList from "./components/EpisodeList";

import PodcastTitle from "./components/PodcastTitle";
import EpisodeTitle from "./components/EpisodeTitle";
import EpisodeCover from "./components/EpisodeCover";
import {
  PlayerProgressBar,
  PlayerAudioTimer,
  PlayerControls,
} from "./components/PlayerElements";

import { useQuery, gql } from "@apollo/client";

const GET_PODCAST_ITEM = gql`
  query episode($guid: String!) {
    podcastItem(_id: $guid) {
      title
      url
      ... on Episode {
        enclosure {
          duration
          url
          cover {
            medium_url
          }
        }
      }
      podcast {
        title
        website_url
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_PODCAST_ITEM, {
    variables: { guid: "5fa3a8c5fc92823536cc66ce" },
  });

  const [episodeListVisible, setEpisodeListVisible] = useState(false);
  const [playerState, setPlayerState] = useRecoilState(playerStore);

  const audioPlayer = useRef(undefined);

  useEffect(() => {
    if (playerState.currentItem == null && data?.podcastItem) {
      setPlayerState({
        ...playerState,
        currentItem: data.podcastItem,
        podcast: data.podcastItem.podcast,
      });
    }

    if (audioPlayer.current) {
      const audioSrc = playerState.currentItem?.enclosure?.url;
      if (audioPlayer.current.src !== audioSrc) {
        audioPlayer.current.src = audioSrc;
        audioPlayer.current.play();
      }
    }
  }, [data, playerState, setPlayerState]);

  function toggleEpisodeList() {
    setEpisodeListVisible((current) => !current);
  }

  const { currentItem: item } = playerState;

  console.log(playerState);

  return error ? (
    <pre>error : {JSON.stringify(error)}</pre>
  ) : loading || item == null ? (
    <p>Loading...</p>
  ) : item?.enclosure ? (
    <div className="player">
      <div className="playerHead">
        <audio ref={audioPlayer} src={item.enclosure.url} hidden></audio>
        <EpisodeCover
          episodeCoverUrl={item.enclosure.cover.medium_url}
          episodeTitle={item.title}
        />
        <div className="rightDivPlayer">
          <EpisodeTitle episodeLink={item.url} episodeTitle={item.title} />
          <PodcastTitle
            podcastLink={item.podcast.website_url}
            podcastTitle={item.podcast.title}
            audioSrc={item.enclosure.url}
          />
          <PlayerProgressBar playerRef={audioPlayer} />
          <PlayerAudioTimer playerRef={audioPlayer} initialDuration={0} />
          <PlayerControls
            playerRef={audioPlayer}
            episodeTitle={item.title}
            showEpList={toggleEpisodeList}
          />
        </div>
      </div>
      {episodeListVisible ?? <EpisodeList />}
    </div>
  ) : (
    <p>Ce post n'est pas un épisode avec média. Retrouvez le sur podCloud</p>
  );
}
