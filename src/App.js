import React, { useRef, useEffect, useState } from "react";

import playerAtom from "./stores/player";
import { useRecoilState } from "recoil";

import "./App.css"
import EpList from "./components/ep_list";

import { convertHMS } from "./utils"

export default function App() {
	let [playerStore, setPlayerStore] = useRecoilState(playerAtom);
	let [currentTime, setCurrentTime] = useState("00:00:00");
	let [pourcentageProgression, setPourcentageProgression] = useState("0%")
	let [displayEpList, setDisplayEpList] = useState(false);

	let audioPlayer = useRef(undefined);
	let progressbar = useRef(undefined)
	let intervalCheck = undefined;

	useEffect(() => {
		if (audioPlayer.current.src !== playerStore.audio) { audioPlayer.current.src = playerStore.audio; }

		if (playerStore.paused) {
			audioPlayer.current.pause()
			clearInterval(intervalCheck);
			updateTime();
		} else {
			audioPlayer.current.play()
			setInterval(updateTime, 200);
		}
	}, [playerStore, intervalCheck])

	function updateTime() {
		setCurrentTime(convertHMS(audioPlayer.current.currentTime))

		setPourcentageProgression(Math.trunc((audioPlayer.current.currentTime / audioPlayer.current.duration) * 10000) / 100)
	}

	function changeTime(event) {
		let percent = event.nativeEvent.offsetX / progressbar.current.offsetWidth;
		audioPlayer.current.currentTime = percent * audioPlayer.current.duration;
	}

	function playPauseEp() {
		if (playerStore.paused) {
			let played_ep = { ...playerStore }
			played_ep.paused = false

			setPlayerStore(played_ep);
		} else if (!playerStore.paused) {
			let played_ep = { ...playerStore }
			played_ep.paused = true

			setPlayerStore(played_ep);
		}
	}

	function moins15() {
		audioPlayer.current.currentTime = audioPlayer.current.currentTime - 15
		updateTime();
	}

	function plus15() {
		audioPlayer.current.currentTime = audioPlayer.current.currentTime + 15
		updateTime();
	}

	function epList() {
		setDisplayEpList(current => !current);
	}

	return (
		<div className="player">
			<div className="playerHead">
				<audio ref={audioPlayer} hidden></audio>
				<img src={playerStore.img} alt={"Image de " + playerStore.title} />
				<div className="rightDivPlayer">
					<p id="eptitle"><a href={playerStore.ep_link} alt={"Ecouter " + playerStore.title + " sur podCloud"}>{playerStore.title}</a></p>
					<p id="podtitle"><a href={playerStore.pod_link} alt={"Découvrir le podcast " + playerStore.pod_title + " sur podCloud"}>{playerStore.pod_title}</a> <a href={playerStore.audio} alt="Télécharger"><img id="download" src="/download.svg" alt="Télécharger" /></a></p>
					<div id="progressbar" ref={progressbar} onClick={changeTime}>
						<div id="prog" style={{ width: pourcentageProgression + "%" }}></div>
					</div>
					<div className="time">
						<p id="audio-time">{currentTime}</p>
						<p id="audio-duration">{convertHMS(playerStore.duration)}</p>
					</div>
					<div className="controls">
						<img src={"/backward.svg"} alt="-15s" onClick={moins15} />
						<img id="playButton" src={playerStore.paused ? "/play.svg" : "/pause.svg"}
							alt={playerStore.paused ? "Reprendre " + playerStore.title : "Mettre en pause " + playerStore.title}
							onClick={playPauseEp} />
						<img src={"/forward.svg"} alt="+15s" onClick={plus15} />
						<img src={"/list.svg"} alt="Liste des épisodes" onClick={epList} />
					</div>
				</div>
			</div>
			<EpList displayed={displayEpList} />
		</div>

	)
}