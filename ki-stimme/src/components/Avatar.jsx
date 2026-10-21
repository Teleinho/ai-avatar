const mouths = {
  neutral: 'w-10 h-1.5 bg-gray-800 rounded-full',
  happy: 'w-12 h-6 border-b-4 border-gray-800 rounded-b-full',
  sad: 'w-12 h-6 border-t-4 border-gray-800 rounded-t-full',
  angry: 'w-10 h-1.5 bg-gray-800 rounded-full',
}

const leftBrows = {
  neutral: 'invisible',
  happy: 'invisible',
  sad: '-rotate-12',
  angry: 'rotate-12',
}

const rightBrows = {
  neutral: 'invisible',
  happy: 'invisible',
  sad: 'rotate-12',
  angry: '-rotate-12',
}

function Eye({ browClass }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-6 h-1 bg-gray-800 rounded ${browClass}`}></div>
      <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
    </div>
  )
}

export default function Avatar({ avatar, isSpeaking, emotion }) {
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
            <Eye browClass={leftBrows[emotion]} />
            <Eye browClass={rightBrows[emotion]} />
          </div>
          <div className="mt-4 h-8 flex justify-center items-start">
            <div className={isSpeaking ? 'mouth-talk' : mouths[emotion]}></div>
          </div>
        </div>

        <h2 className="card-title h4 mt-4">{avatar.name}</h2>
        <h3 className="card-subtitle h6 text-muted mb-3">{avatar.beruf}</h3>
        <p className="card-text">{avatar.beschreibung}</p>
      </div>
    </div>
  )
}