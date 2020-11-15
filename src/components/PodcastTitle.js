import React from "react";
import episodeStore from "../stores/episode";
import podcastStore from "../stores/podcast";
import { useRecoilState } from "recoil";

const PodcastTitle = () => {
  const [episodeState] = useRecoilState(episodeStore);
  const [podcastState] = useRecoilState(podcastStore);

  const { enclosure_url } = episodeState;

  const { url, title } = podcastState;

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
