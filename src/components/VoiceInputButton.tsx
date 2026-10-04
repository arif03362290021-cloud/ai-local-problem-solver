import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  language: SupportedLanguage;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ onTranscript, language }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Select language for speech recognizer
      if (language === 'ur' || language === 'ur-roman') {
        recognition.lang = 'ur-PK';
      } else if (language === 'ps') {
        recognition.lang = 'ps-AF';
      } else {
        recognition.lang = 'en-PK';
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        onTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setIsSupported(false);
    }
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!isSupported) {
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Recognition start failed:', e);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      title={isListening ? 'Click to stop recording' : 'Click to speak in your language'}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg text-sm font-medium transition-all ${
        isListening
          ? 'bg-rose-600 text-white shadow-md animate-pulse ring-2 ring-rose-400'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
      }`}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 mr-1 text-white animate-bounce" />
          <span className="text-xs font-semibold">Listening...</span>
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 text-slate-700" />
          <span className="text-xs ml-1 font-medium hidden sm:inline">Voice Input</span>
        </>
      )}
    </button>
  );
};
