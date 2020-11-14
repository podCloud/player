import React from "react";

import "./EpisodeListItem.css";

import { convertHMS } from "../../utils";

export default function EpList({ episode }) {
  function playMe() {
    let new_played = {};

    new_played.paused = false;
    new_played.img = episode.enclosure.cover.url;
    new_played.title = episode.title;
    new_played.ep_link = episode.url;
    new_played.guid = episode.guid;
    new_played.duration = episode.enclosure.duration;
    new_played.audio = episode.enclosure.url;
  }

  return (
    <div className="oneEpisode">
      <img
        onClick={playMe}
        src={true ? "/pause.svg" : "/play.svg"}
        alt={true ? "Mettre en pause" : "Reprendre"}
      />
      <p className="OneEpTitle">{episode.title}</p>
      <p className="OneEpDuration">{convertHMS(episode.enclosure.duration)}</p>
    </div>
  );
}
