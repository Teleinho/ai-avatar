export default function SpeechControls({
  voices, voiceURI, setVoiceURI, rate, setRate,
  isSpeaking, isPaused, hasText, onSpeak, onPause, onResume, onStop,
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5">Stimme & Geschwindigkeit</h2>

        <label className="form-label mt-2" htmlFor="voice">Stimme:</label>
        <select
          id="voice"
          className="form-select"
          value={voiceURI}
          onChange={(e) => setVoiceURI(e.target.value)}
        >
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>

        <label className="form-label mt-3" htmlFor="rate">
          Geschwindigkeit: <strong>{rate.toFixed(1)}</strong>
        </label>
        <input
          id="rate"
          type="range"
          className="form-range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        <div className="d-flex justify-content-between small text-muted">
          <span>0.5</span><span>1.0</span><span>1.5</span><span>2.0</span>
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          <button className="btn btn-success" onClick={onSpeak} disabled={!hasText}>
            ▶ Sprechen
          </button>
          <button className="btn btn-warning" onClick={onPause} disabled={!isSpeaking || isPaused}>
            ⏸ Pause
          </button>
          <button className="btn btn-info" onClick={onResume} disabled={!isPaused}>
            ▶ Weiter
          </button>
          <button className="btn btn-danger" onClick={onStop} disabled={!isSpeaking}>
            ⏹ Stop
          </button>
        </div>
      </div>
    </div>
  )
}