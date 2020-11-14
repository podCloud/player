import React from "react";

  const EpisodeCover = ({ episodeCoverUrl, episodeTitle }) => (
    <img src={episodeCoverUrl} alt={"Pochette de " + episodeTitle} />
  );

export default EpisodeCover;
