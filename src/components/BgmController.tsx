import { useBgm } from '@/context/BgmContext';

export default function BgmController() {
  const { isPlaying, togglePlay, setVolume } = useBgm();

  return (
    <div className="p-4 fixed bottom-4 right-4 text-white rounded-lg shadow-md">
      <button onClick={togglePlay} className="px-4 py-2 bg-fly-navy rounded">
        {isPlaying ? 'Pause BGM' : 'Play BGM'}
      </button>
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