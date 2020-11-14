import React from "react";

import EpisodeListItem from "./EpisodeListItem";

import "./EpisodeList.css";

export default function EpisodeList() {
  return (
    <div className="epList">
      {[].map((ep) => (
        <EpisodeListItem episode={ep} />
      ))}
    </div>
  );
}
