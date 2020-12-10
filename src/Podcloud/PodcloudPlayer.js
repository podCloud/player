import React, { useEffect } from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

import { debounce } from "debounce";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const PodcloudPlayer = () => {
  // get guid or feed_id from url

  const path_components = document.location.pathname
    .split("/")
    .filter((a) => typeof a === "string" && a.trim().length);
  const opts = path_components
    .slice(path_components.lastIndexOf("player") + 1)
    .reverse();

  const list = opts.includes("list");
  const fixedSize = opts.includes("fixed-size");

  const guid_match = opts
    .map((a) => a.match(/guid:([\w\d]+)/))
    .filter(Array.isArray)[0];

  const guid_meta = document.querySelector("meta[property='podcloud:item_id']");

  const guid = guid_match ? guid_match[1] : guid_meta?.content;

  useEffect(() => {
    if (fixedSize) {
      console.log("fixed size");
      return;
    }

    const resizeListener = debounce(() => {
      const message = { setMyHeight: getWidth() > 575 ? 200 : 420 };

      console.log(message);
      window.parent.postMessage(message, "*");
    }, 120);

    window.addEventListener("resize", resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [fixedSize]);

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;
