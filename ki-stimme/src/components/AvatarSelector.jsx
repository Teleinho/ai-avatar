export default function AvatarSelector({ avatars, selected, onSelect }) {
  return (
    <div className="mb-4">
      <h2 className="h5">Avatar auswählen</h2>
      <div className="btn-group w-100" role="group">
        {avatars.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`btn ${selected.id === a.id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onSelect(a)}
          >
            {a.emoji} {a.name}
          </button>
        ))}
      </div>
    </div>
  )
}