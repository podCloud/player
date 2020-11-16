import React from "react";

import EpisodesListItem from "./EpisodesListItem";

import "./EpisodesList.css";

const EpisodesList = ({ episodesList, setCurrentEpisode }) => {
  return Array.isArray(episodesList) && episodesList.length > 0 ? (
    <div className="epList">
      {episodesList.map((ep) => (
        <EpisodesListItem
          key={ep._id}
          episode={ep}
          setCurrentEpisode={setCurrentEpisode}
        />
      ))}
    </div>
  ) : null;
};
export default EpisodesList;
