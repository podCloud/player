import React, { useEffect } from "react";

import PodcloudProvider from "./PodcloudProvider";
import PodcloudLoader from "./PodcloudLoader";
import Player from "../components/Player";

import { debounce } from "debounce";

import { resizeFrame, parseOpts } from "../utils.js";

const DEFAULT_OPTS = { list: false, fixedSize: false };

const PodcloudPlayer = () => {
  const opts = Object.assign(
    DEFAULT_OPTS,
    ...[
      document.querySelector("meta[property='podcloud:player']")?.content || "",
      document.location.pathname.substring(
        document.location.pathname.lastIndexOf("player")
      ),
    ].map(parseOpts)
  );

  console.log({ player_options: opts });

  const list = opts.list;
  const fixedSize = opts.fixedSize;
  const guid = opts.guid;

  useEffect(() => {
    resizeFrame();

    if (fixedSize) {
      return console.log("Resize event not binded. Fixed size mode");
    }

    const resizeListener = debounce(() => resizeFrame(), 120);
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [fixedSize]);

  useEffect(() => {
    const resetResizingToggle = debounce(() => {
      document.documentElement.style.removeProperty("--transition-speed");
    }, 200);

    const addResizingToggle = () => {
      document.documentElement.style.setProperty("--transition-speed", 0);
      resetResizingToggle();
    };

    window.addEventListener("resize", addResizingToggle);

    return () => {
      window.removeEventListener("resize", addResizingToggle);
    };
  }, []);

  return (
    <PodcloudProvider>
      <PodcloudLoader guid={guid} list={list} PlayerComponent={Player} />
    </PodcloudProvider>
  );
};

export default PodcloudPlayer;
