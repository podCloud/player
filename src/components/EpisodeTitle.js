import React from "react";

  const EpisodeTitle = ({ episodeLink, episodeTitle }) => (
    <p id="eptitle">
      <a href={episodeLink} alt={"Ecouter " + episodeTitle + " sur podCloud"}>
        {episodeTitle}
      </a>
    </p>
  );

export default EpisodeTitle;
