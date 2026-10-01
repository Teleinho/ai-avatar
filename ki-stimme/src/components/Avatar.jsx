export default function Avatar({ avatar, isSpeaking }) {
  return (
    <div className="card shadow-sm text-center">
      <div className="card-body">
        <div className="h-8 mb-3">
          {isSpeaking && (
            <span className="inline-block bg-yellow-100 border border-yellow-400 rounded-full px-3 py-1 text-sm">
              💬 {avatar.name} spricht …
            </span>
          )}
        </div>

        <div
          className={`mx-auto w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${avatar.farbe} ${
            isSpeaking ? 'scale-110 ring-8 ring-yellow-300 animate-pulse' : ''
          }`}
        >
          <div className="flex gap-6">
            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
          </div>
          <div className={`bg-gray-800 rounded-full mt-6 ${isSpeaking ? 'mouth-talk' : 'w-10 h-1.5'}`}></div>
        </div>

        <div className="text-5xl mt-4">{avatar.emoji}</div>
        <h2 className="card-title h4 mt-2">{avatar.name}</h2>
        <h3 className="card-subtitle h6 text-muted mb-3">{avatar.beruf}</h3>
        <p className="card-text">{avatar.beschreibung}</p>
      </div>
    </div>
  )
}