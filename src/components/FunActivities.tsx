import React, { useState } from 'react';
import { X, Rocket, Zap, Star, Shuffle, Play, RotateCcw } from 'lucide-react';
import { planets } from '../data/planets';

interface FunActivitiesProps {
  onClose: () => void;
}

const FunActivities: React.FC<FunActivitiesProps> = ({ onClose }) => {
  const [currentActivity, setCurrentActivity] = useState<'menu' | 'memory' | 'order' | 'speed'>('menu');
  const [memoryCards, setMemoryCards] = useState<Array<{id: string, name: string, color: string, flipped: boolean, matched: boolean}>>([]);
  const [memoryScore, setMemoryScore] = useState(0);
  const [orderGame, setOrderGame] = useState<Array<{id: string, name: string, correct: boolean}>>([]);
  const [speedGame, setSpeedGame] = useState<{planet: any, options: string[], timeLeft: number, score: number}>({
    planet: null,
    options: [],
    timeLeft: 10,
    score: 0
  });

  const initMemoryGame = () => {
    const selectedPlanets = planets.slice(0, 6);
    const cards = [...selectedPlanets, ...selectedPlanets].map((planet, index) => ({
      id: `${planet.id}-${index}`,
      name: planet.spanishName,
      color: planet.color,
      flipped: false,
      matched: false
    }));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setMemoryScore(0);
    setCurrentActivity('memory');
  };

  const initOrderGame = () => {
    const shuffledPlanets = [...planets].sort(() => Math.random() - 0.5);
    setOrderGame(shuffledPlanets.map(p => ({
      id: p.id,
      name: p.spanishName,
      correct: false
    })));
    setCurrentActivity('order');
  };

  const initSpeedGame = () => {
    const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    const wrongOptions = planets.filter(p => p.id !== randomPlanet.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(p => p.spanishName);
    
    const options = [randomPlanet.spanishName, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setSpeedGame({
      planet: randomPlanet,
      options,
      timeLeft: 10,
      score: 0
    });
    setCurrentActivity('speed');
  };

  const handleMemoryCardClick = (cardId: string) => {
    const flippedCards = memoryCards.filter(card => card.flipped && !card.matched);
    if (flippedCards.length >= 2) return;

    const newCards = memoryCards.map(card => {
      if (card.id === cardId && !card.flipped && !card.matched) {
        return { ...card, flipped: true };
      }
      return card;
    });

    setMemoryCards(newCards);

    const newFlippedCards = newCards.filter(card => card.flipped && !card.matched);
    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].name === newFlippedCards[1].name) {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            newFlippedCards.some(fc => fc.id === card.id) 
              ? { ...card, matched: true }
              : card
          ));
          setMemoryScore(prev => prev + 1);
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            newFlippedCards.some(fc => fc.id === card.id) 
              ? { ...card, flipped: false }
              : card
          ));
        }, 1000);
      }
    }
  };

  if (currentActivity === 'memory') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">🧠 Memoria Planetaria</h2>
              <div className="flex gap-2">
                <span className="bg-white/20 px-4 py-2 rounded-full">Pares: {memoryScore}</span>
                <button onClick={() => setCurrentActivity('menu')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-center text-lg mb-6">¡Encuentra las parejas de planetas!</p>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {memoryCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleMemoryCardClick(card.id)}
                  className="aspect-square bg-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center text-white font-bold text-lg"
                  style={{
                    backgroundColor: card.flipped || card.matched ? card.color : '#e5e7eb',
                    color: card.flipped || card.matched ? 'white' : 'transparent'
                  }}
                >
                  {(card.flipped || card.matched) ? card.name : '?'}
                </div>
              ))}
            </div>
            
            {memoryCards.every(card => card.matched) && (
              <div className="text-center mt-6">
                <h3 className="text-2xl font-bold text-green-600 mb-4">¡Felicidades! 🎉</h3>
                <button
                  onClick={initMemoryGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  🔄 Jugar otra vez
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentActivity === 'order') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-t-3xl text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">📏 Ordena los Planetas</h2>
              <button onClick={() => setCurrentActivity('menu')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-center text-lg mb-6">¡Ordena los planetas desde el más cercano al Sol hasta el más lejano!</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {orderGame.map((planet, index) => {
                const planetData = planets.find(p => p.id === planet.id);
                return (
                  <div
                    key={planet.id}
                    className="bg-gray-100 p-4 rounded-xl text-center cursor-pointer hover:bg-gray-200 transition-colors"
                    style={{ backgroundColor: planetData?.color + '20' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: planetData?.color }}
                    />
                    <p className="font-bold">{planet.name}</p>
                    <p className="text-sm text-gray-600">Posición: {index + 1}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  const correctOrder = ['Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno'];
                  const isCorrect = orderGame.every((planet, index) => planet.name === correctOrder[index]);
                  alert(isCorrect ? '¡Perfecto! 🎉' : '¡Inténtalo de nuevo! 😊');
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl mr-4"
              >
                ✅ Verificar orden
              </button>
              <button
                onClick={initOrderGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                🔄 Mezclar otra vez
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentActivity === 'speed') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-t-3xl text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">⚡ Velocidad Espacial</h2>
              <div className="flex gap-2">
                <span className="bg-white/20 px-4 py-2 rounded-full">Tiempo: {speedGame.timeLeft}s</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Puntos: {speedGame.score}</span>
                <button onClick={() => setCurrentActivity('menu')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8 text-center">
            {speedGame.planet && (
              <>
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  style={{ 
                    backgroundColor: speedGame.planet.color,
                    boxShadow: `0 0 30px ${speedGame.planet.color}80`
                  }}
                />
                <h3 className="text-2xl font-bold mb-6">¿Qué planeta es este?</h3>
                <div className="space-y-3">
                  {speedGame.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const isCorrect = option === speedGame.planet.spanishName;
                        if (isCorrect) {
                          setSpeedGame(prev => ({ ...prev, score: prev.score + 1 }));
                          // Generate new question
                          setTimeout(() => {
                            const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
                            const wrongOptions = planets.filter(p => p.id !== randomPlanet.id)
                              .sort(() => Math.random() - 0.5)
                              .slice(0, 2)
                              .map(p => p.spanishName);
                            
                            const options = [randomPlanet.spanishName, ...wrongOptions].sort(() => Math.random() - 0.5);
                            
                            setSpeedGame(prev => ({
                              ...prev,
                              planet: randomPlanet,
                              options
                            }));
                          }, 500);
                        }
                      }}
                      className="w-full p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors text-lg font-medium"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-t-3xl text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">✨ ¡Más Diversión Espacial!</h2>
            <button onClick={onClose} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Memory Game */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={initMemoryGame}>
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">🧠 Memoria Planetaria</h3>
              <p className="text-gray-700">¡Encuentra las parejas de planetas! Ejercita tu memoria mientras aprendes.</p>
            </div>

            {/* Order Game */}
            <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-2xl text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={initOrderGame}>
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shuffle size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">📏 Ordena los Planetas</h3>
              <p className="text-gray-700">Coloca los planetas en orden desde el más cercano al Sol hasta el más lejano.</p>
            </div>

            {/* Speed Game */}
            <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-2xl text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={initSpeedGame}>
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">⚡ Velocidad Espacial</h3>
              <p className="text-gray-700">¡Identifica los planetas lo más rápido que puedas! Pon a prueba tus reflejos.</p>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">🌟 Datos Súper Divertidos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-gray-800 font-medium">🚀 Si pudieras viajar en coche al Sol, tardarías más de 100 años conduciendo sin parar!</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-gray-800 font-medium">🌙 En la Luna puedes saltar 6 veces más alto que en la Tierra porque hay menos gravedad!</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-gray-800 font-medium">🪐 Los anillos de Saturno están hechos de millones de pedazos de hielo y roca!</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-gray-800 font-medium">⭐ Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra!</p>
              </div>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-100 to-blue-100 p-6 rounded-2xl text-center">
              <Rocket size={48} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">🚀 Misión Espacial</h3>
              <p className="text-gray-700 mb-4">¡Imagina que eres un astronauta! ¿A qué planeta te gustaría viajar primero?</p>
              <button 
                onClick={() => alert('🚀 ¡Excelente elección, astronauta! Recuerda llevar tu traje espacial y mucha curiosidad.')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors"
              >
                ¡Despegar!
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl text-center">
              <RotateCcw size={48} className="text-green-500 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌍 Rotación Planetaria</h3>
              <p className="text-gray-700 mb-4">Los planetas giran como trompos gigantes en el espacio. ¡Por eso tenemos día y noche!</p>
              <button 
                onClick={() => alert('🌍 ¡Increíble! La Tierra gira una vez cada 24 horas, ¡por eso tenemos días!')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-colors"
              >
                ¡Girar!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunActivities;