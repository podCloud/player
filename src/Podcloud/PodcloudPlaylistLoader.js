import React, { useEffect, useState, useCallback } from "react";

import { useLazyQuery } from "@apollo/client";

import { GET_PLAYLIST, processEpisodesList } from "./queries.js";
import PlayerRenderer from "./PlayerRenderer";

const PodcloudPlaylistLoader = ({ playlist_ids, PlayerComponent }) => {
  const [currentEpisode, setCurrentEpisode] = useState();
  const [currentPodcast, setCurrentPodcast] = useState();
  const [episodesList, setEpisodesList] = useState();
  const [loading, setLoading] = useState(true);

  console.log("Using playlist loader");

  const setEpisode = useCallback(
    (ep) => {
      setCurrentEpisode(ep);
      setCurrentPodcast({
        ...ep.podcast,
        url: ep.podcast?.website_url,
      });
    },
    [setCurrentEpisode, setCurrentPodcast]
  );

  // Queries

  const [loadPlaylist, playlist] = useLazyQuery(GET_PLAYLIST, {
    variables: playlist_ids,
  });

  // Has playlist loaded ? Load it
  useEffect(() => {
    if (playlist_ids) {
      if (playlist.called) {
        if (playlist.loading) {
          setLoading(true);
          setEpisodesList({ loading: true });
        } else {
          const epList = processEpisodesList(playlist.data?.playlist?.items);
          setEpisodesList(epList);

          const ep = epList[0];
          if (ep) {
            setEpisode(ep);
          }
          setLoading(false);
        }
      } else {
        setLoading(true);
        loadPlaylist();
      }
    }
  }, [playlist_ids, playlist, setEpisode, loadPlaylist, setLoading]);

  console.log({ playlist, episodesList, loading, currentEpisode });

  // log errors

  if (playlist.error) {
    console.error("playlist error", playlist.error, playlist);
  }

  console.log("currentEpisode", currentEpisode);

  return (
    <PlayerRenderer
      {...{
        currentEpisode,
        currentPodcast,
        episodesList,
        setEpisode,
        listOpened: true,
        loading,
        error: playlist.error,
      }}
    />
  );
};

export default PodcloudPlaylistLoader;
