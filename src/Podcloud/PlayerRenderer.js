import React from "react";

import { useTranslation } from "react-i18next";

import { Trans } from "react-i18next";

import Player from "../components/Player";

const PlayerRenderer = ({
  error,
  loading,
  currentEpisode,
  currentPodcast,
  episodesList,
  listOpened,
  setEpisode,
}) => {
  const { t } = useTranslation();

  // Render

  if (error) {
    return <p>{t("error_occured")}</p>;
  }

  if (loading) {
    console.log("rendering loader");
    return <p>{t("loading")}</p>;
  }

  if (currentEpisode?._id) {
    if (currentEpisode.enclosure_url) {
      return (
        <Player
          currentEpisode={currentEpisode}
          currentPodcast={currentPodcast}
          episodesList={episodesList}
          episodesListOpened={listOpened}
          setCurrentEpisode={setEpisode}
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

export default PlayerRenderer;
