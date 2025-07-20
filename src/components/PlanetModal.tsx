import React, { useState } from 'react';
import { X, Volume2, Play } from 'lucide-react';
import { Planet, GameQuestion } from '../types';

interface PlanetModalProps {
  planet: Planet;
  onClose: () => void;
  onStartGame: () => void;
}

const PlanetModal: React.FC<PlanetModalProps> = ({ planet, onClose, onStartGame }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const playAudio = () => {
    setIsPlayingAudio(true);
    // Simulate audio playback
    alert(`🔊 Reproduciendo: "${planet.audioText}"`);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in zoom-in duration-300">
        {/* Header */}
        <div 
          className="relative p-6 rounded-t-3xl text-white"
          style={{ backgroundColor: planet.color }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <div
              className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg"
              style={{ backgroundColor: planet.color, boxShadow: `0 0 30px ${planet.color}80` }}
            >
              {planet.id === 'saturn' && (
                <>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white/60 rounded-full w-32 h-8" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-3 border-white/40 rounded-full w-36 h-9" />
                </>
              )}
            </div>
            <h2 className="text-3xl font-bold">{planet.spanishName}</h2>
            <p className="text-white/90 font-medium">({planet.name})</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📖 Descripción</h3>
            <p className="text-gray-700 text-lg leading-relaxed">{planet.description}</p>
          </div>

          {/* Audio Button */}
          <div className="mb-6">
            <button
              onClick={playAudio}
              disabled={isPlayingAudio}
              className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl transition-colors text-lg font-medium w-full justify-center"
            >
              {isPlayingAudio ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Reproduciendo...
                </>
              ) : (
                <>
                  <Volume2 size={24} />
                  🔊 Escuchar información
                </>
              )}
            </button>
          </div>

          {/* Fun Fact */}
          <div className="mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-lg font-bold text-gray-800 mb-2">🤯 ¿Sabías que...?</h3>
            <p className="text-gray-700 font-medium">{planet.funFact}</p>
          </div>

          {/* Moons */}
          {planet.moons && planet.moons.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🌙 Lunas</h3>
              <div className="flex flex-wrap gap-2">
                {planet.moons.map((moon) => (
                  <span
                    key={moon}
                    className="bg-gray-100 text-gray-800 px-3 py-2 rounded-full text-sm font-medium"
                  >
                    {moon}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Game Button */}
          <button
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-4 rounded-xl transition-all duration-300 text-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Play size={24} />
            🎮 ¡Jugar mini-juego!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;