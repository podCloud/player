import { gql } from "@apollo/client";

export const GET_PODCAST_ITEM = gql`
  query episode($guid: String!) {
    podcastItem(_id: $guid) {
      _id
      title
      podcloud_url
      published_at
      ... on Episode {
        enclosure {
          duration
          url
          cover {
            small_url
            medium_url
          }
        }
      }
      podcast {
        _id
        title
        website_url
        platforms {
          podcloud_url
        }
      }
    }
  }
`;

export const GET_PODCAST_ITEMS = gql`
  query podcast($podcast_id: String!) {
    podcast(_id: $podcast_id) {
      items {
        _id
        title
        podcloud_url
        published_at
        ... on Episode {
          enclosure {
            duration
            url
            cover {
              small_url
              medium_url
            }
          }
        }
      }
    }
  }
`;

export const GET_PLAYLIST = gql`
  query playlist($user_id: String!, $id: String!) {
    playlist(user_id: $user_id, _id: $id) {
      name
      items {
        _id
        title
        podcloud_url
        published_at
        ... on Episode {
          enclosure {
            duration
            url
            cover {
              small_url
              medium_url
            }
          }
        }
        podcast {
          _id
          title
          website_url
          platforms {
            podcloud_url
          }
        }
      }
    }
  }
`;

export const podcloudItemToPlayerItem = (ep) => ({
  ...ep,
  published_at: new Date(ep.published_at),
  enclosure_url: ep.enclosure?.url,
  enclosure_duration: ep.enclosure?.duration,
  cover: ep.enclosure?.cover,
});

export const processEpisodesList = (arr, podcast) =>
  Array.isArray(arr)
    ? arr
        .map(podcloudItemToPlayerItem)
        .filter((ep) => !!ep.enclosure_url)
        // merge podcast key if given
        .map((ep) => ({ ...ep, ...(podcast ? { podcast } : {}) }))
    : [];
