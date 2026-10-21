import { useState } from 'react'
import Navbar from './components/Navbar'
import Avatar from './components/Avatar'
import AvatarSelector from './components/AvatarSelector'
import EmotionSelector from './components/EmotionSelector'
import TextInput from './components/TextInput'
import HighlightedText from './components/HighlightedText'
import SpeechControls from './components/SpeechControls'
import useSpeech from './hooks/useSpeech'
import { avatars } from './data/avatars'
import { emotions } from './data/emotions'
import { languages } from './data/languages'

export default function App() {
  const [avatar, setAvatar] = useState(avatars[0])
  const [emotion, setEmotion] = useState('neutral')
  const [lang, setLang] = useState('de-DE')
  const [text, setText] = useState('')
  const speech = useSpeech(lang)

  const currentEmotion = emotions.find((e) => e.id === emotion)

  const handleSpeak = () => {
    speech.speak(text, avatar.pitch + currentEmotion.pitchAdd, currentEmotion.rateFactor)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <AvatarSelector avatars={avatars} selected={avatar} onSelect={setAvatar} />
            <EmotionSelector emotions={emotions} selected={emotion} onSelect={setEmotion} />
            <Avatar avatar={avatar} isSpeaking={speech.isSpeaking} emotion={emotion} />
          </div>

          <div className="col-12 col-lg-7">
            <TextInput text={text} setText={setText} />

            {speech.isSpeaking && (
              <HighlightedText text={speech.spokenText} charIndex={speech.charIndex} />
            )}

            <SpeechControls
              languages={languages}
              lang={lang}
              setLang={setLang}
              voices={speech.voices}
              voiceURI={speech.voiceURI}
              setVoiceURI={speech.setVoiceURI}
              rate={speech.rate}
              setRate={speech.setRate}
              isSpeaking={speech.isSpeaking}
              isPaused={speech.isPaused}
              hasText={text.trim().length > 0}
              onSpeak={handleSpeak}
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