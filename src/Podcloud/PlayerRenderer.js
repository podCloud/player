import Player from "../components/Player";
import React from "react";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

const MsgBox = ({ children }) => (
  <div
    style={{
      padding: "10px 15px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fdfdfd",
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        background: "#0e0e0e",
        opacity: 0.6,
        zIndex: 0,
        borderRadius: 4,
        boxShadow: "0 0 10px #000",
      }}
    />
    <div style={{ zIndex: 1 }}>{children}</div>
  </div>
);

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
    return <MsgBox>{t("error_occured")}</MsgBox>;
  }

  if (loading) {
    console.log("rendering loader");
    return <MsgBox>{t("loading")}</MsgBox>;
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
      <MsgBox>
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
      </MsgBox>
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
