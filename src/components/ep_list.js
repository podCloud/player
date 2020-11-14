import React from "react";

import playerAtom from "../stores/player";
import { useRecoilState } from "recoil";

import OneEp from "./one_ep"

import "./ep_list.css";

export default function EpList({ displayed }) {
	let [playerStore,] = useRecoilState(playerAtom);

	return (
		<>
			{displayed ?
				<div className="epList">
					{playerStore.episodes.map(ep => (
						<OneEp key={ep.guid} episode={ep} />
					))}
				</div>
				: <></>}
		</>
	)
}