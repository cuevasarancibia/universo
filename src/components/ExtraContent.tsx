import React from 'react';
import { Rocket, Sparkles, RotateCcw } from 'lucide-react';

interface ExtraContentProps {
  onClose: () => void;
}

const ExtraContent: React.FC<ExtraContentProps> = ({ onClose }) => {
  const facts = [
    "🌟 El Sol es tan grande que cabrían 1.3 millones de Tierras dentro de él",
    "🌙 La Luna se aleja de la Tierra 3.8 cm cada año",
    "⚡ Un rayo en Júpiter puede ser 1000 veces más potente que en la Tierra",
    "🌍 La Tierra es el único planeta que no lleva el nombre de un dios romano o griego",
    "🪐 Saturno es menos denso que el agua - ¡flotaría en un océano gigante!",
    "🌡️ Venus es más caliente que Mercurio aunque esté más lejos del Sol",
    "💨 Los vientos en Neptuno pueden alcanzar 2,100 km/h",
    "🌋 El volcán más grande del sistema solar está en Marte: Monte Olimpo"
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-t-3xl text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">🌌 Curiosidades del Espacio</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Fun Facts Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-400 hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-800 text-lg font-medium leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>

          {/* Interactive Sections */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Comets Section */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl text-center">
              <Sparkles size={48} className="text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">☄️ Cometas</h3>
              <p className="text-gray-700">
                Los cometas son "bolas de nieve sucias" que vienen del espacio lejano y crean hermosas colas cuando se acercan al Sol.
              </p>
            </div>

            {/* Rotation Section */}
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-2xl text-center">
              <RotateCcw size={48} className="text-blue-500 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">🌍 Rotación</h3>
              <p className="text-gray-700">
                Los planetas giran sobre sí mismos (rotación) y alrededor del Sol (traslación). ¡Por eso tenemos días y años!
              </p>
            </div>

            {/* Space Exploration */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl text-center">
              <Rocket size={48} className="text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">🚀 Exploración</h3>
              <p className="text-gray-700">
                Los humanos han enviado robots a explorar otros planetas. ¡Algunos han llegado hasta Marte y más allá!
              </p>
            </div>
          </div>

          {/* Scale Comparison */}
          <div className="mt-8 bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📏 ¿Qué tan grandes son?</h3>
            <div className="flex items-end justify-center space-x-4">
              <div className="text-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto mb-2"></div>
                <p className="text-xs">Mercurio</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-xs">Venus</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <p className="text-xs">Tierra</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full mx-auto mb-2"></div>
                <p className="text-xs">Júpiter</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-2 relative">
                  <div className="absolute inset-0 border-2 border-gray-400 rounded-full"></div>
                </div>
                <p className="text-xs">Sol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraContent;