import React, { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

import { useRecoilState } from "recoil";

import podcastStore from "../stores/podcast";
import episodeStore from "../stores/episode";

const GET_PODCAST_ITEM = gql`
  query episode($guid: String!) {
    podcastItem(_id: $guid) {
      _id
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
        _id
        title
        website_url
      }
    }
  }
`;

const PodcloudLoader = ({ guid, children }) => {
  const { loading, error, data } = useQuery(GET_PODCAST_ITEM, {
    variables: { guid },
  });

  const [episodeState, setEpisodeState] = useRecoilState(episodeStore);
  const [podcastState, setPodcastState] = useRecoilState(podcastStore);

  console.log({ episodeState, podcastState });

  useEffect(() => {
    if (!podcastState._id && data?.podcastItem?.podcast) {
      console.log({
        ...podcastState,
        ...data.podcastItem.podcast,
        url: data.podcastItem.podcast?.website_url,
      });
      setPodcastState({
        ...podcastState,
        ...data.podcastItem.podcast,
        url: data.podcastItem.podcast?.website_url,
      });
    }

    if (!episodeState._id && data?.podcastItem) {
      console.log({
        ...episodeState,
        ...data.podcastItem,
        enclosure_url: data.podcastItem.enclosure?.url,
        enclosure_duration: data.podcastItem.enclosure?.duration,
        cover: data.podcastItem.enclosure?.cover,
      });

      setEpisodeState({
        ...episodeState,
        ...data.podcastItem,
        enclosure_url: data.podcastItem.enclosure?.url,
        enclosure_duration: data.podcastItem.enclosure?.duration,
        cover: data.podcastItem.enclosure?.cover,
      });
    }
  }, [data, podcastState, setPodcastState, episodeState, setEpisodeState]);

  console.log("rendering loader");

  return loading || !podcastState._id || !episodeState._id ? (
    <>Loading...</>
  ) : error ? (
    <pre>{JSON.stringify(error, null, 3)}</pre>
  ) : (
    <>{children}</>
  );
};

export default PodcloudLoader;
