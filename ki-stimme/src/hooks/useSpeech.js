import { useState, useEffect, useMemo, useRef } from 'react'

export default function useSpeech(lang) {
  const [allVoices, setAllVoices] = useState([])
  const [voiceURI, setVoiceURI] = useState('')
  const [rate, setRate] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [charIndex, setCharIndex] = useState(-1)
  const currentRef = useRef(null)

  useEffect(() => {
    const synth = window.speechSynthesis
    const load = () => setAllVoices(synth.getVoices())

    load()
    synth.addEventListener('voiceschanged', load)

    return () => {
      synth.removeEventListener('voiceschanged', load)
      synth.cancel()
    }
  }, [])

  // nur Stimmen der gewählten Sprache anzeigen
  const voices = useMemo(() => {
    const prefix = lang.slice(0, 2).toLowerCase()
    const matching = allVoices.filter((v) => v.lang.toLowerCase().startsWith(prefix))
    return matching.length > 0 ? matching : allVoices
  }, [allVoices, lang])

  const selectedVoiceURI = voices.some((v) => v.voiceURI === voiceURI)
    ? voiceURI
    : voices[0]?.voiceURI || ''

  const reset = () => {
    setIsSpeaking(false)
    setIsPaused(false)
    setCharIndex(-1)
  }

  const speak = (text, pitch = 1, rateFactor = 1) => {
    if (!text.trim()) return
    const synth = window.speechSynthesis
    synth.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = lang
    speech.rate = Math.min(2, Math.max(0.5, rate * rateFactor))
    speech.pitch = Math.min(2, Math.max(0, pitch))

    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI)
    if (voice) speech.voice = voice

    currentRef.current = speech
    setSpokenText(text)
    setCharIndex(-1)

    speech.onstart = () => {
      if (currentRef.current !== speech) return
      setIsSpeaking(true)
      setIsPaused(false)
    }
    speech.onboundary = (e) => {
      if (currentRef.current !== speech) return
      setCharIndex(e.charIndex)
    }
    speech.onend = () => {
      if (currentRef.current !== speech) return
      reset()
    }
    speech.onerror = () => {
      if (currentRef.current !== speech) return
      reset()
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
    currentRef.current = null
    window.speechSynthesis.cancel()
    reset()
  }

  return {
    voices,
    voiceURI: selectedVoiceURI,
    setVoiceURI,
    rate,
    setRate,
    isSpeaking,
    isPaused,
    spokenText,
    charIndex,
    speak,
    pause,
    resume,
    stop,
  }
}