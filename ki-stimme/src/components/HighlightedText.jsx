export default function HighlightedText({ text, charIndex }) {
  let content = text

  if (charIndex >= 0) {
    const match = text.slice(charIndex).match(/^\S+/)
    const end = match ? charIndex + match[0].length : charIndex

    content = (
      <>
        {text.slice(0, charIndex)}
        <mark className="bg-yellow-300 rounded px-1">{text.slice(charIndex, end)}</mark>
        {text.slice(end)}
      </>
    )
  }

  return (
    <div className="card shadow-sm mb-4 border-warning">
      <div className="card-body">
        <h2 className="h5">Aktueller Text</h2>
        <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </p>
      </div>
    </div>
  )
}