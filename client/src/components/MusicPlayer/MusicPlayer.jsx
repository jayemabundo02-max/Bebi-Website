import { useRef, useState } from "react";
import { buildUploadUrl } from "../../utils/helpers";

export default function MusicPlayer({ audioUrl, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    await audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="music-player">
      <button disabled={!audioUrl} onClick={togglePlayback} type="button">
        {isPlaying ? "Pause" : "Play"}
      </button>
      <span>{title}</span>
      {audioUrl ? (
        <audio onEnded={() => setIsPlaying(false)} ref={audioRef} src={buildUploadUrl(audioUrl)}>
          <track kind="captions" />
        </audio>
      ) : null}
    </div>
  );
}
