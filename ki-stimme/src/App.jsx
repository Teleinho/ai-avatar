import { useState } from 'react'
import Navbar from './components/Navbar'
import Avatar from './components/Avatar'
import AvatarSelector from './components/AvatarSelector'
import TextInput from './components/TextInput'
import SpeechControls from './components/SpeechControls'
import useSpeech from './hooks/useSpeech'
import { avatars } from './data/avatars'

export default function App() {
  const [avatar, setAvatar] = useState(avatars[0])
  const [text, setText] = useState('')
  const speech = useSpeech()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <AvatarSelector avatars={avatars} selected={avatar} onSelect={setAvatar} />
            <Avatar avatar={avatar} isSpeaking={speech.isSpeaking} />
          </div>
          <div className="col-12 col-lg-7">
            <TextInput text={text} setText={setText} />
            <SpeechControls
              voices={speech.voices}
              voiceURI={speech.voiceURI}
              setVoiceURI={speech.setVoiceURI}
              rate={speech.rate}
              setRate={speech.setRate}
              isSpeaking={speech.isSpeaking}
              isPaused={speech.isPaused}
              hasText={text.trim().length > 0}
              onSpeak={() => speech.speak(text, avatar.pitch)}
              onPause={speech.pause}
              onResume={speech.resume}
              onStop={speech.stop}
            />
          </div>
        </div>
      </main>
    </div>
  )
}