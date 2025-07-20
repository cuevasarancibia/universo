import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Planet } from '../types';
import { planets } from '../data/planets';

interface GameModalProps {
  planet: Planet;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ planet, onClose }) => {
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [question, setQuestion] = useState<{
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  } | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [planet]);

  const generateQuestion = () => {
    // Create more interesting questions about the planet
    const questionTypes = [
      {
        text: `¿Cuál es una característica especial de ${planet.spanishName}?`,
        generateOptions: () => {
          const characteristics = {
            mercury: ['Es el más cercano al Sol', 'Tiene anillos como Saturno', 'Es el planeta más grande'],
            venus: ['Es el planeta más caliente', 'Tiene muchas lunas', 'Es azul como la Tierra'],
            earth: ['Es el único con vida conocida', 'No tiene atmósfera', 'Es completamente rojo'],
            mars: ['Es conocido como el planeta rojo', 'Es más grande que Júpiter', 'No tiene montañas'],
            jupiter: ['Es el planeta más grande', 'Es sólido como una roca', 'No tiene lunas'],
            saturn: ['Tiene hermosos anillos', 'Es el más pequeño', 'No tiene lunas'],
            uranus: ['Gira de lado como una pelota', 'Es el más caliente', 'No tiene atmósfera'],
            neptune: ['Tiene los vientos más rápidos', 'Es el más cercano al Sol', 'No tiene color azul']
          };
          
          const correctAnswer = characteristics[planet.id as keyof typeof characteristics][0];
          const wrongAnswers = [
            characteristics[planet.id as keyof typeof characteristics][1],
            characteristics[planet.id as keyof typeof characteristics][2]
          ];
          
          const options = [correctAnswer, ...wrongAnswers];
          return { options, correctAnswer };
        }
      },
      {
        text: `¿Qué dato curioso es cierto sobre ${planet.spanishName}?`,
        generateOptions: () => {
          const funFacts = {
            mercury: ['Un día dura 59 días terrestres', 'Tiene océanos de agua', 'Es más grande que el Sol'],
            venus: ['Gira al revés', 'Tiene anillos visibles', 'Es el planeta más frío'],
            earth: ['Es el único planeta con vida conocida', 'No tiene luna', 'Es cuadrado'],
            mars: ['Tiene el volcán más grande del sistema solar', 'Es completamente plano', 'No tiene atmósfera'],
            jupiter: ['Todos los planetas cabrían dentro', 'Es sólido como una piedra', 'No tiene tormentas'],
            saturn: ['Flotaría en agua', 'Es el más pesado', 'No tiene lunas'],
            uranus: ['Rueda de lado como una pelota', 'Es el más caliente', 'Gira muy lento'],
            neptune: ['Tiene vientos de 2,100 km/h', 'No tiene vientos', 'Es el planeta más pequeño']
          };
          
          const correctFact = funFacts[planet.id as keyof typeof funFacts][0];
          const wrongFacts = [
            funFacts[planet.id as keyof typeof funFacts][1],
            funFacts[planet.id as keyof typeof funFacts][2]
          ];
          
          const options = [correctFact, ...wrongFacts];
          return { options, correctAnswer: correctFact };
        }
      },
      {
        text: `¿Cuántas lunas tiene ${planet.spanishName}?`,
        generateOptions: () => {
          const moonCounts = {
            mercury: ['0 lunas', '5 lunas', '12 lunas'],
            venus: ['0 lunas', '3 lunas', '8 lunas'],
            earth: ['1 luna', '4 lunas', '7 lunas'],
            mars: ['2 lunas', '6 lunas', '1 luna'],
            jupiter: ['Más de 70 lunas', '2 lunas', '0 lunas'],
            saturn: ['Más de 80 lunas', '1 luna', '5 lunas'],
            uranus: ['Más de 25 lunas', '0 lunas', '3 lunas'],
            neptune: ['Más de 10 lunas', '1 luna', '0 lunas']
          };
          
          const options = moonCounts[planet.id as keyof typeof moonCounts];
          const correctAnswer = options[0];
          return { options, correctAnswer };
        }
      }
    ];

    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const { options, correctAnswer } = randomType.generateOptions();
    
    // Mezclar las opciones y encontrar el nuevo índice de la respuesta correcta
    const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
    const correctIndex = shuffledOptions.findIndex(option => option === correctAnswer);
    

    setQuestion({
      text: randomType.text,
      options: shuffledOptions,
      correctAnswer: correctIndex,
      explanation: planet.funFact
    });
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === question?.correctAnswer) {
      setGameState('correct');
      // Play success sound simulation
      setTimeout(() => {
        alert('🎉 ¡Excelente! ' + question.explanation);
      }, 500);
    } else {
      setGameState('wrong');
      setTimeout(() => {
        alert('😊 ¡Inténtalo de nuevo! La respuesta correcta es: ' + question?.options[question.correctAnswer]);
      }, 500);
    }
  };

  const resetGame = () => {
    setGameState('playing');
    setSelectedAnswer(null);
    generateQuestion();
  };

  if (!question) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl transform animate-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold">🎮 Mini-Juego</h2>
            <p className="text-white/90 mt-1">¡Demuestra lo que sabes!</p>
          </div>
        </div>

        {/* Game Content */}
        <div className="p-8">
          {gameState === 'playing' && (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                {question.text}
              </h3>
              
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left bg-gray-100 hover:bg-blue-100 border-2 border-transparent hover:border-blue-300 rounded-xl transition-all duration-200 text-lg font-medium"
                  >
                    <span className="font-bold text-blue-600 mr-3">
                      {String.fromCharCode(65 + index)})
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {gameState === 'correct' && (
            <div className="text-center">
              <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-4">¡Correcto! 🎉</h3>
              <p className="text-gray-700 text-lg mb-6">{question.explanation}</p>
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors text-lg font-medium"
                >
                  🔄 Jugar otra vez
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors text-lg font-medium"
                >
                  🏠 Volver al sistema solar
                </button>
              </div>
            </div>
          )}

          {gameState === 'wrong' && (
            <div className="text-center">
              <XCircle size={80} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-600 mb-4">¡Inténtalo de nuevo! 😊</h3>
              <p className="text-gray-700 text-lg mb-6">
                La respuesta correcta era: <strong>{question.options[question.correctAnswer]}</strong>
              </p>
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors text-lg font-medium"
                >
                  🔄 Intentar otra vez
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors text-lg font-medium"
                >
                  🏠 Volver al sistema solar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModal;