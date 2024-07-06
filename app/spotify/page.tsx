import { getNowPlaying, NowPlaying } from "@/app/lib/spotify";
import { unstable_noStore as noStore } from "next/cache";

export default async function SpotifyPage() {
  noStore();

  const nowPlaying = await getNowPlaying();

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
