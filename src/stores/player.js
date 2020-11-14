import {
	atom,
} from 'recoil';

const playerState = atom({
	key: 'playerState', // unique ID (with respect to other atoms/selectors)
	default: {
		paused: true,
		img: "https://kapsulepixel.lepodcast.fr/kapsule-pixel-7-knotbot/cover",
		title: "Kapsule Pixel ~7~ : KnotBot",
		pod_title: "Kapsule Pixel",
		ep_link: "https://kapsulepixel.lepodcast.fr/kapsule-pixel-7-knotbot",
		pod_link: "https://kapsulepixel.lepodcast.fr/",
		guid: "5fa3a8c5fc92823536cc66ce",
		duration: 112,
		audio: "https://horizon.gicma.dev/dl/a5cca792-2751-45e1-b794-d5531cadaed3.1604561383.mp3",
		episodes: [
			{
				"title": "Kapsule Pixel ~7~ : KnotBot",
				"guid": "5fa3a8c5fc92823536cc66ce",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-7-knotbot",
				"enclosure": {
					"duration": 112,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-7-knotbot/enclosure.1604561383.mp3?p=f",
					"cover": {
						"dominant_color": "B1DFF7",
						"url": "https://uploads.podcloud.fr/uploads/covers/e500/be25/2738/449e/10f8/cfd5/a1bc/bdd1/b4df/4cd2/e500be252738449e10f8cfd5a1bcbdd1b4df4cd2.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~6~ : Game Dev Tycoon",
				"guid": "5f9a79c6fc92824623c7b7ea",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-6-game-dev-tycoon",
				"enclosure": {
					"duration": 138,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-6-game-dev-tycoon/enclosure.1603959637.mp3?p=f",
					"cover": {
						"dominant_color": "FDF1D1",
						"url": "https://uploads.podcloud.fr/uploads/covers/d282/3782/31cf/95d0/9a9b/fc20/a6e4/ad07/02c2/4705/d282378231cf95d09a9bfc20a6e4ad0702c24705.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~5~ : The Solitaire Conspiracy",
				"guid": "5f9400de3928f77dc4d4f1da",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-5-the-solitaire-conspiracy",
				"enclosure": {
					"duration": 125,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-5-the-solitaire-conspiracy/enclosure.1603550489.mp3?p=f",
					"cover": {
						"dominant_color": "0E1D25",
						"url": "https://uploads.podcloud.fr/uploads/covers/c36e/1798/a042/18b9/b54e/35ae/0f36/5fe0/fb48/76cd/c36e1798a04218b9b54e35ae0f365fe0fb4876cd.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~4~ : Sea of Thieves",
				"guid": "5f889dcb3928f71455aa1471",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-4-sea-of-thieves",
				"enclosure": {
					"duration": 138,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-4-sea-of-thieves/enclosure.1603265401.mp3?p=f",
					"cover": {
						"dominant_color": "D2A680",
						"url": "https://uploads.podcloud.fr/uploads/covers/03b6/b417/f82b/9f03/68a3/ba51/e3c3/2d8f/c737/5dd9/03b6b417f82b9f0368a3ba51e3c32d8fc7375dd9.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~3~ : Hades",
				"guid": "5f80acfc23b5c2381896c202",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-3-hades",
				"enclosure": {
					"duration": 119,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-3-hades/enclosure.1603265448.mp3?p=f",
					"cover": {
						"dominant_color": "230D12",
						"url": "https://uploads.podcloud.fr/uploads/covers/e1f6/588a/f1e1/5fe8/16f4/b8b2/0431/e10e/d998/2b56/e1f6588af1e15fe816f4b8b20431e10ed9982b56.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~2~ : Spiderman (PS4)",
				"guid": "5f77218523b5c2429f70b935",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-2-spiderman-ps4",
				"enclosure": {
					"duration": 124,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-2-spiderman-ps4/enclosure.1603265444.mp3?p=f",
					"cover": {
						"dominant_color": "4F2E25",
						"url": "https://uploads.podcloud.fr/uploads/covers/33d5/8206/4f90/9d3d/a16b/bed5/888b/df9c/db11/4a48/33d582064f909d3da16bbed5888bdf9cdb114a48.jpg"
					}
				}
			},
			{
				"title": "Kapsule Pixel ~1~ : Cloud Gardens",
				"guid": "5f6e2baa23b5c26cd8654a7b",
				"url": "https://kapsulepixel.lepodcast.fr/kapsule-pixel-1-cloud-gardens",
				"enclosure": {
					"duration": 116,
					"url": "https://stats.podcloud.fr/kapsulepixel/kapsule-pixel-1-cloud-gardens/enclosure.1603265441.mp3?p=f",
					"cover": {
						"dominant_color": "B2B1C9",
						"url": "https://uploads.podcloud.fr/uploads/covers/ae88/ba50/7f9c/e459/c64d/3630/1f8e/1536/db6c/d1b4/ae88ba507f9ce459c64d36301f8e1536db6cd1b4.jpg"
					}
				}
			}
		]
	},
});

export default playerState;