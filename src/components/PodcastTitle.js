import React from "react";

const PodcastTitle = ({ podcastTitle, podcastLink, audioSrc }) => (
  <p id="podtitle">
    <a
      href={podcastLink}
      alt={"Découvrir le podcast " + podcastTitle + " sur podCloud"}
    >
      {podcastTitle}
    </a>{" "}
    <a href={audioSrc} alt="Télécharger">
      <img id="download" src="/download.svg" alt="Télécharger" />
    </a>
  </p>
);

export default PodcastTitle;
