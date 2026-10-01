export default function TextInput({ text, setText }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5">Text eingeben</h2>
        <textarea
          className="form-control"
          rows="6"
          placeholder="Schreibe deinen Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">{text.length} Zeichen</small>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setText('')}
            disabled={text.length === 0}
          >
            🗑️ Löschen
          </button>
        </div>
      </div>
    </div>
  )
}