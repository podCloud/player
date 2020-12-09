import React, { useEffect, useState } from "react";

import { useLazyQuery, gql } from "@apollo/client";

import { useTranslation } from "react-i18next";

import { Trans } from "react-i18next";

const GET_PODCAST_ITEM = gql`
  query episode($guid: String!) {
    podcastItem(_id: $guid) {
      _id
      title
      podcloud_url
      ... on Episode {
        enclosure {
          duration
          url
          cover {
            small_url
            medium_url
            big_url
          }
        }
      }
      podcast {
        _id
        title
        website_url
        platforms {
          podcloud_url
        }
      }
    }
  }
`;

const GET_PODCAST_ITEMS = gql`
  query podcast($podcast_id: String!) {
    podcast(_id: $podcast_id) {
      items {
        _id
        title
        podcloud_url
        ... on Episode {
          enclosure {
            duration
            url
            cover {
              small_url
              medium_url
              big_url
            }
          }
        }
      }
    }
  }
`;

const podcloudItemToPlayerItem = (ep) => ({
  ...ep,
  enclosure_url: ep.enclosure?.url,
  enclosure_duration: ep.enclosure?.duration,
  cover: ep.enclosure?.cover,
});

const PodcloudLoader = ({ guid, list, PlayerComponent }) => {
  const { t } = useTranslation();

  const [currentEpisode, setCurrentEpisode] = useState();
  const [currentPodcast, setCurrentPodcast] = useState();

  const [loadEpisode, episode] = useLazyQuery(GET_PODCAST_ITEM, {
    variables: { guid },
  });

  useEffect(() => {
    if (guid) {
      loadEpisode();
    }
  }, [guid, loadEpisode]);

  const [loadPodcastEpisodes, podcastEpisodes] = useLazyQuery(
    GET_PODCAST_ITEMS,
    {
      variables: { podcast_id: currentPodcast?._id },
    }
  );

  useEffect(() => {
    const ep = episode?.data?.podcastItem;
    if (ep?._id) {
      console.log("setCurrentEpisode");
      setCurrentEpisode(podcloudItemToPlayerItem(ep));
      setCurrentPodcast({
        ...ep.podcast,
        url: ep.podcast?.website_url,
      });
    }
  }, [episode?.data, setCurrentEpisode, setCurrentPodcast]);

  useEffect(() => {
    if (currentPodcast?._id && list === true) {
      console.log("loading episodes list");
      loadPodcastEpisodes();
    }
  }, [currentPodcast?._id, list, loadPodcastEpisodes]);

  console.log("rendering loader");
  console.log("currentEpisode", currentEpisode);

  const episodesList = podcastEpisodes?.loading
    ? { loading: true }
    : Array.isArray(podcastEpisodes?.data?.podcast?.items)
    ? podcastEpisodes.data.podcast.items.map(podcloudItemToPlayerItem)
    : [];

  console.log({ podcastEpisodes, episodesList });

  if (episode?.error) {
    console.error("episode error", episode.error, episode);
  }
  if (podcastEpisodes?.error) {
    console.error("podcast episodes", podcastEpisodes.error, podcastEpisodes);
  }

  const loading =
    guid &&
    (!episode.called ||
      episode.loading ||
      (!currentEpisode?._id && episode.data?.podcastItem?._id));

  console.log({ loading, episode, currentEpisode });

  if (episode.error) {
    return <p>{t("error_occured")}</p>;
  }

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  if (currentEpisode?._id) {
    debugger;
    if (currentEpisode.enclosure_url) {
      return (
        <PlayerComponent
          currentEpisode={currentEpisode}
          currentPodcast={currentPodcast}
          episodesList={episodesList}
          setCurrentEpisode={setCurrentEpisode}
        />
      );
    }

    return (
      <p style={{ textAlign: "center" }}>
        <Trans i18nKey="unavailable_episode">
          {/* eslint-disable react/jsx-no-target-blank */}
          {/* eslint-disable jsx-a11y/anchor-has-content */}
          <a
            href={currentEpisode.podcloud_url ?? "https://podcloud.fr"}
            target="_blank"
            style={{ borderBottom: "1px dashed #ccc", marginBottom: -1 }}
          />
          {/* eslint-enable jsx-a11y/anchor-has-content */}
          {/* eslint-enable react/jsx-no-target-blank */}
        </Trans>
      </p>
    );
  }

  return (
    <p style={{ textAlign: "center" }}>
      <Trans i18nKey="unknown_episode">
        {/* eslint-disable react/jsx-no-target-blank */}
        {/* eslint-disable jsx-a11y/anchor-has-content */}
        <a
          href="https://podcloud.fr"
          target="_blank"
          style={{ borderBottom: "1px dashed #ccc", marginBottom: -1 }}
        />
        {/* eslint-enable jsx-a11y/anchor-has-content */}
        {/* eslint-enable react/jsx-no-target-blank */}
      </Trans>
    </p>
  );
};

export default PodcloudLoader;
