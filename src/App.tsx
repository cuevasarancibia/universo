import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, X } from 'lucide-react';
import SolarSystem from './components/SolarSystem';
import PlanetModal from './components/PlanetModal';
import GameModal from './components/GameModal';
import ExtraContent from './components/ExtraContent';
import FunActivities from './components/FunActivities';
import { Planet } from './types';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showFun, setShowFun] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Auto-hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    // Simulate planet selection sound
    console.log(`🔊 Sonido: ¡Has seleccionado ${planet.spanishName}!`);
  };

  const handleCloseModal = () => {
    setSelectedPlanet(null);
    setShowGame(false);
  };

  const handleStartGame = () => {
    setShowGame(true);
  };

  const handleShowExtra = () => {
    setShowExtra(true);
  };

  const handleCloseExtra = () => {
    setShowExtra(false);
  };

  const handleShowFun = () => {
    setShowFun(true);
  };

  const handleCloseFun = () => {
    setShowFun(false);
  };

  return (
    <div className="relative min-h-screen">
      <SolarSystem onPlanetClick={handlePlanetClick} />
      
      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={handleShowExtra}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <BookOpen size={24} />
          📚 Curiosidades
        </button>
        
        <button
          onClick={handleShowFun}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles size={24} />
          ✨ Más diversión
        </button>
      </div>

      {/* Modals */}
      {selectedPlanet && !showGame && (
        <PlanetModal
          planet={selectedPlanet}
          onClose={handleCloseModal}
          onStartGame={handleStartGame}
        />
      )}

      {selectedPlanet && showGame && (
        <GameModal
          planet={selectedPlanet}
          onClose={handleCloseModal}
        />
      )}

      {showExtra && (
        <ExtraContent onClose={handleCloseExtra} />
      )}

      {showFun && (
        <FunActivities onClose={handleCloseFun} />
      )}

      {/* Instructions for parents/teachers */}
      {showInstructions && (
        <div className="absolute top-4 right-4 bg-white/90 p-4 rounded-xl max-w-xs text-sm shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-800">💡 Instrucciones:</h4>
            <button
              onClick={() => setShowInstructions(false)}
              className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors ml-2"
            >
              <X size={14} />
            </button>
          </div>
          <ul className="text-gray-700 space-y-1">
            <li>• Haz clic en los planetas para explorar</li>
            <li>• Usa el botón de audio para escuchar</li>
            <li>• Juega los mini-juegos para aprender</li>
            <li>• Explora las curiosidades del espacio</li>
            <li>• Disfruta de los juegos de diversión</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;