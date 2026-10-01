import { useState, useEffect } from 'react'

export default function useSpeech() {
  const [voices, setVoices] = useState([])
  const [voiceURI, setVoiceURI] = useState('')
  const [rate, setRate] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const synth = window.speechSynthesis

    const loadVoices = () => {
      const all = synth.getVoices()
      const german = all.filter((v) => v.lang.startsWith('de'))
      const list = german.length > 0 ? german : all
      setVoices(list)
      setVoiceURI((prev) => prev || list[0]?.voiceURI || '')
    }

    loadVoices()
    synth.addEventListener('voiceschanged', loadVoices)

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices)
      synth.cancel()
    }
  }, [])

  const speak = (text, pitch = 1) => {
    if (!text.trim()) return
    const synth = window.speechSynthesis
    synth.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'de-DE'
    speech.rate = rate
    speech.pitch = pitch

    const voice = voices.find((v) => v.voiceURI === voiceURI)
    if (voice) speech.voice = voice

    speech.onstart = () => {
      setIsSpeaking(true)
      setIsPaused(false)
    }
    speech.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    speech.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    synth.speak(speech)
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
  }

  const resume = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  return { voices, voiceURI, setVoiceURI, rate, setRate, isSpeaking, isPaused, speak, pause, resume, stop }
}