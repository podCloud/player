import React, { useEffect, useState, useCallback } from "react";

import { useLazyQuery } from "@apollo/client";

import {
  GET_PODCAST_ITEM,
  GET_PODCAST_ITEMS,
  processEpisodesList,
  podcloudItemToPlayerItem,
} from "./queries.js";

import PlayerRenderer from "./PlayerRenderer";

const PodcloudPodcastEpisodeLoader = ({ guid, list, PlayerComponent }) => {
  const [currentEpisode, setCurrentEpisode] = useState();
  const [currentPodcast, setCurrentPodcast] = useState();
  const [episodesList, setEpisodesList] = useState();
  const [loading, setLoading] = useState(true);

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

  const [loadEpisode, episode] = useLazyQuery(GET_PODCAST_ITEM, {
    variables: { guid },
  });

  const [loadPodcastEpisodes, podcastEpisodes] = useLazyQuery(
    GET_PODCAST_ITEMS,
    {
      variables: { podcast_id: currentPodcast?._id },
    }
  );

  // Has episode loaded ? Load it
  useEffect(() => {
    if (guid) {
      // episode loading
      if (episode.called) {
        if (episode.loading) {
          setLoading(true);
        } else {
          setLoading(false);
          const ep = episode?.data?.podcastItem;
          if (ep?._id) {
            console.log("setEpisode");
            setEpisode(podcloudItemToPlayerItem(ep));
          }
        }
      } else {
        setLoading(true);
        loadEpisode();
      }
    }
  }, [guid, episode, setEpisode, loadEpisode, setLoading]);

  // has podcast episodes list ? load it
  useEffect(() => {
    if (guid) {
      // should load episodes list
      if (list === true || list === "opened") {
        // has currentPodcast
        if (currentPodcast?._id) {
          if (podcastEpisodes.called) {
            if (podcastEpisodes.loading) {
              setEpisodesList({ loading: true });
            } else {
              setEpisodesList(
                processEpisodesList(
                  podcastEpisodes.data?.podcast?.items,
                  currentPodcast
                )
              );
            }
          } else {
            loadPodcastEpisodes();
          }
        }
      }
    }
  }, [
    guid,
    list,
    currentPodcast,
    podcastEpisodes,
    setEpisodesList,
    loadPodcastEpisodes,
  ]);

  console.log({ podcastEpisodes, episodesList });

  console.log({ loading, episode, currentEpisode });

  // log errors

  if (episode.error) {
    console.error("episode error", episode.error, episode);
  }

  if (podcastEpisodes.error) {
    console.error("podcast episodes", podcastEpisodes.error, podcastEpisodes);
  }

  console.log("currentEpisode", currentEpisode);

  return (
    <PlayerRenderer
      {...{
        currentEpisode,
        currentPodcast,
        episodesList,
        setEpisode,
        listOpened: list === "opened",
        loading,
        error: episode.error,
      }}
    />
  );
};

export default PodcloudPodcastEpisodeLoader;
