import React from "react";

const PodcastTitle = ({ currentEpisode }) => {
  const { enclosure_url } = currentEpisode;

  const { url, title } = currentEpisode.podcast;

  return (
    <p id="podtitle">
      <a href={url} alt={"Découvrir le podcast " + title + " sur podCloud"}>
        {title}
      </a>{" "}
      <a href={enclosure_url} alt="Télécharger">
        <img id="download" src="/download.svg" alt="Télécharger" />
      </a>
    </p>
  );
};

export default PodcastTitle;
