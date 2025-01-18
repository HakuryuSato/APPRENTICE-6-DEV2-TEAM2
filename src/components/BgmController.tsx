import { useBgm } from '@/context/BgmContext';
import { PlayIcon, PauseIcon, MusicalNoteIcon  } from '@heroicons/react/24/solid';
import { Button } from './ui/button';


export default function BgmController() {
  const { isPlaying, togglePlay, setVolume } = useBgm();

  return (
    <div className="p-4 fixed bottom-4 right-4 rounded-lg">
       
      <Button onClick={togglePlay} className="flex w-20 bg-fly-softPurple shadow-md">
        <MusicalNoteIcon className="text-fly-navy"/>
        {/* {isPlaying ? 'Pause BGM ICH' : 'Play BGM'} */}
        {isPlaying ? (
        <PauseIcon className="text-fly-navy" />
      ) : (
        <PlayIcon className="text-fly-navy" />
      )}
      </Button>
      {/* <div className="mt-2">
        <label htmlFor="volume" className="block text-sm">
          Volume
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.3"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full"
        />
      </div> */}
    </div>
  );
}