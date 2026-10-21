export default function EmotionSelector({ emotions, selected, onSelect }) {
  return (
    <div className="mb-4">
      <h2 className="h5">Emotion</h2>
      <div className="d-flex flex-wrap gap-2">
        {emotions.map((e) => (
          <button
            key={e.id}
            type="button"
            className={`btn btn-sm ${selected === e.id ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => onSelect(e.id)}
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  )
}