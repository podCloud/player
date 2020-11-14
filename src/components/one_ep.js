import React from "react";

import playerAtom from "../stores/player";
import { useRecoilState } from "recoil";

import "./one_ep.css";

export default function EpList({ episode }) {
	let [playerStore, setPlayerStore] = useRecoilState(playerAtom);

	function playMe() {
		if (playerStore.guid === episode.guid) {
			if (playerStore.paused) {
				let new_played = { ...playerStore };
				new_played.paused = false;
				setPlayerStore(new_played);
			} else {
				let new_played = { ...playerStore };
				new_played.paused = true;
				setPlayerStore(new_played);
			}
		} else {
			let new_played = { ...playerStore };

			new_played.paused = false;
			new_played.img = episode.enclosure.cover.url;
			new_played.title = episode.title;
			new_played.ep_link = episode.url;
			new_played.guid = episode.guid;
			new_played.duration = episode.enclosure.duration;
			new_played.audio = episode.enclosure.url;

			setPlayerStore(new_played)
		}

	}

	return (
		<div className="oneEpisode">
			<img onClick={playMe} src={playerStore.guid === episode.guid && !playerStore.paused ? "/pause.svg" : "/play.svg"} alt={playerStore.guid === episode.guid && !playerStore.paused ? "Mettre en pause" : "Reprendre"} />
			<p className="OneEpTitle">{episode.title}</p>
			<p className="OneEpDuration">{episode.enclosure.duration}</p>
		</div>
	)
}