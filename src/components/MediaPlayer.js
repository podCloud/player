import React, { useCallback, useEffect, useMemo, useRef } from "react";

import EpisodeCover from "./EpisodeCover";
import classnames from "classnames";
import playerStore from "../stores/player";
import playerjs from "player.js";
import styles from "./MediaPlayer.module.scss";
import { useMediaSession } from "@mebtte/react-media-session";
import { useRecoilState } from "recoil";

const MediaPlayer = ({ currentEpisode }) => {
  const player = useRef();

  const [playerState, setPlayerState] = useRecoilState(playerStore);

  const ref = player.current;

  useEffect(() => {
    if (ref && ref.dataset.boundEvents !== "did") {
      playerjs.HTML5Adapter(ref).ready();

      ref.dataset.boundEvents = "did";

      console.log("adding funcs to playerState");
      setPlayerState((playerState) => {
        return {
          ...playerState,
          ref: ref,
          minus15: () => {
            ref.currentTime = ref.currentTime - 15;
            if (ref.paused) {
              ref.play().catch((error) => {
                ref.dispatchEvent(new ErrorEvent(error, {}));
              });
            }
          },
          plus15: () => {
            ref.currentTime = ref.currentTime + 15;
            if (ref.paused) {
              ref.play().catch((error) => {
                ref.dispatchEvent(new ErrorEvent(error, {}));
              });
            }
          },
          play: () => {
            ref.play().catch((error) => {
              ref.dispatchEvent(new ErrorEvent(error, {}));
            });
          },
          pause: () => {
            ref.pause();
          },
          playPause: () => {
            const loading = ref.seeking || ref.networkState === 2;

            if (loading || (!ref.paused && !ref.ended)) {
              ref.pause();
            } else {
              ref.play().catch((error) => {
                ref.dispatchEvent(new ErrorEvent(error, {}));
              });
            }
          },
          seekToPercent: (percent) => {
            const jump = () => {
              ref.currentTime = percent * ref.duration;
              ref.play();
            };

            if (ref.readyState > 0) {
              jump();
            } else {
              ref
                .play()
                .then(jump)
                .catch((error) => {
                  ref.dispatchEvent(new ErrorEvent(error, {}));
                });
            }
          },
          togglePlaybackRate: () => {
            ref.playbackRate = ref.playbackRate + 0.25;
            if (ref.playbackRate > 2) ref.playbackRate = 0.25;
          },
          toggleFullscreen: () => {
            if (ref.requestFullscreen) {
              ref.requestFullscreen();
            } else if (ref.mozRequestFullScreen) {
              ref.mozRequestFullScreen(); // Firefox
            } else if (ref.webkitRequestFullscreen) {
              ref.webkitRequestFullscreen(); // Chrome and Safari
            }
          },
        };
      });

      const events = (
        "loadstart progress suspend abort error " +
        "emptied stalled loadedmetadata loadeddata canplay canplaythrough " +
        "playing waiting seeking seeked ended durationchange " +
        "timeupdate play pause ratechange resize volumechange"
      ).split(" ");

      const bindPlayer = (ev) => {
        ref.addEventListener(ev.trim(), (e) => {
          if (e?.error) {
            console.error(e.error);
          }

          setPlayerState((playerState) => ({
            ...playerState,
            hasVideo: ref.videoWidth > 0 || ref.videoHeight > 0,
            duration: ref.duration,
            currentTime: ref.currentTime,
            paused: ref.paused,
            ended: ref.ended,
            networkState: ref.networkState,
            readyState: ref.readyState,
            playbackRate: ref.playbackRate,
            muted: ref.muted,
            loading: ref.networkState === 2,
            playing: !(ref.ended || ref.seeking || ref.paused),
            percent:
              Math.trunc(
                ((ref.currentTime || 0) / (ref.duration || 1)) * 10000
              ) / 100,
            src: ref.src,
          }));
        });
      };

      events.forEach(bindPlayer);
    }
  }, [ref, setPlayerState]);

  const title = currentEpisode.title;
  const album = currentEpisode.podcast?.title;
  const artist = album;
  const artwork = currentEpisode.enclosure?.cover?.medium_url;

  const mediaSessionMetadata = useMemo(
    () => ({
      title,
      artist,
      album,
      artwork: artwork
        ? [{ src: artwork, sizes: "512x512", type: "image/png" }]
        : [],
    }),
    [title, artist, album, artwork]
  );

  const { play, pause, minus15, plus15 } = playerState;

  const mediaSessionControls = {
    onPlay: useCallback(play, [play]),
    onPause: useCallback(pause, [pause]),
    onSeekBackward: useCallback(minus15, [minus15]),
    onSeekForward: useCallback(plus15, [plus15]),
  };

  useMediaSession({
    ...mediaSessionMetadata,
    ...mediaSessionControls,
  });

  const { _id: episodeID, enclosure_url: mediaUrl } = currentEpisode;

  useEffect(() => {
    if (ref && episodeID !== ref.dataset.episodeID) {
      ref.src = mediaUrl;
      ref.dataset.episodeID = episodeID;

      if (playerState.should_autoplay) {
        ref.play().catch((error) => {
          ref.dispatchEvent(new ErrorEvent(error, {}));
        });
      }

      setPlayerState((playerState) => ({
        ...playerState,
        should_autoplay: true, // autoplay next tracks
      }));
    }
  }, [ref, episodeID, mediaUrl, playerState, setPlayerState]);

  const { hasVideo } = playerState;

  return (
    <>
      <video
        ref={player}
        className={classnames(styles.player, { [styles.hidden]: !hasVideo })}
        preload={"none"}
        onClick={(e) => e.target.requestPictureInPicture()}
      />
      {hasVideo ? null : <EpisodeCover currentEpisode={currentEpisode} />}
    </>
  );
};

export default MediaPlayer;
