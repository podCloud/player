import React, { useEffect, useState } from "react";

import { useQuery, gql } from "@apollo/client";

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

const PodcloudLoader = ({ guid, PlayerComponent }) => {
  console.log("guid");
  const { loading, error, data } = useQuery(GET_PODCAST_ITEM, {
    variables: { guid },
  });

  const [currentEpisode, setCurrentEpisode] = useState();

  useEffect(() => {
    if (data?.podcastItem?._id) {
      console.log("setCurrentEpisode");
      setCurrentEpisode({
        ...data.podcastItem,
        enclosure_url: data.podcastItem.enclosure?.url,
        enclosure_duration: data.podcastItem.enclosure?.duration,
        cover: data.podcastItem.enclosure?.cover,
        podcast: {
          ...data.podcastItem.podcast,
          url: data.podcastItem.podcast?.website_url,
        },
      });
    }
  }, [data, setCurrentEpisode]);

  console.log("rendering loader");
  console.log("currentEpisode", currentEpisode);

  return error ? (
    <pre>{JSON.stringify(error, null, 3)}</pre>
  ) : loading || !currentEpisode?._id ? (
    <>Loading...</>
  ) : (
    <PlayerComponent
      currentEpisode={currentEpisode}
      setCurrentEpisode={setCurrentEpisode}
    />
  );
};

export default PodcloudLoader;
