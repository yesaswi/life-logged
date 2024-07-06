import { getNowPlaying, NowPlaying } from "@/app/lib/spotify";
import { unstable_noStore as noStore } from "next/cache";
import { kv } from "@vercel/kv";

const LATEST_JAM_KEY = "latest_jam_link";

export default async function SpotifyPage() {
  noStore();
  const [nowPlaying, jamLink] = await Promise.all([
    getNowPlaying(),
    kv.get<string>(LATEST_JAM_KEY),
  ]);

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Spotify</h1>
      {nowPlaying ? (
        <div>
          {nowPlaying.isPlaying ? (
            <>
              <img
                src={nowPlaying.albumImageUrl}
                alt={nowPlaying.album}
                width={200}
                height={200}
              />
              <p>{nowPlaying.title}</p>
              <p>{nowPlaying.artist}</p>
              <p>{nowPlaying.album}</p>
              {nowPlaying.progress && <p>{nowPlaying.progress}</p>}
              {jamLink && (
                <div className="mt-4">
                  <a href={jamLink} className="text-blue-500 hover:underline">
                    Join my Spotify Jam session!
                  </a>
                </div>
              )}
            </>
          ) : (
            <p>Not currently playing anything</p>
          )}
        </div>
      ) : (
        <p>Not currently listening to anything</p>
      )}
    </section>
  );
}
