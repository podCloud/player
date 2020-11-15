import React from "react";
import episodeStore from "../stores/episode";
import { useRecoilState } from "recoil";

const EpisodeCover = () => {
  const [episodeState] = useRecoilState(episodeStore);

  const {
    title,
    cover: { medium_url: cover_url },
  } = episodeState;

  return <img src={cover_url} alt={`Pochette de ${title}`} />;
};

export default EpisodeCover;
