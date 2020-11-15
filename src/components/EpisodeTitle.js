import React from "react";
import episodeStore from "../stores/episode";
import { useRecoilState } from "recoil";

const EpisodeTitle = () => {
  const [episodeState] = useRecoilState(episodeStore);

  const { url, title } = episodeState;

  return (
    <p id="eptitle">
      <a href={url} alt={"Ecouter " + title + " sur podCloud"}>
        {title}
      </a>
    </p>
  );
};

export default EpisodeTitle;
