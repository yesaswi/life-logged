import { SpotifyApi, AccessToken } from "@spotify/web-api-ts-sdk";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

export interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  progress?: string;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

async function getAccessToken(): Promise<AccessToken> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return {
    access_token: data.access_token,
    token_type: data.token_type,
    expires_in: data.expires_in,
    refresh_token: refreshToken,
  };
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
  try {
    const accessToken = await getAccessToken();
    const api = SpotifyApi.withAccessToken(clientId, accessToken);

    const response = await api.player.getCurrentlyPlayingTrack();

    if (response && response.item && "id" in response.item) {
      const track = await api.tracks.get(response.item.id);
      const progressMs = response.progress_ms || 0;
      const durationMs = track.duration_ms;

      return {
        isPlaying: response.is_playing,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url,
        progress: `${formatTime(progressMs)} / ${formatTime(durationMs)}`,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return null;
  }
}
