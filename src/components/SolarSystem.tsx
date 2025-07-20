import React from 'react';
import { Planet } from '../types';
import { planets } from '../data/planets';

interface SolarSystemProps {
  onPlanetClick: (planet: Planet) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetClick }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div className="absolute pointer-events-none z-10">
        <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        </div>
      </div>

      {/* Orbital Paths */}
      <div className="absolute pointer-events-none">
        {planets.map((planet) => (
          <div
            key={`orbit-${planet.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
            style={{
              width: `${planet.distance}px`,
              height: `${planet.distance}px`,
            }}
          />
        ))}
      </div>

      {/* Planets */}
      <div className="absolute">
        {planets.map((planet, index) => {
          const angle = (index * 45) % 360; // Distribute planets around the circle
          const radius = Math.min(planet.distance * 0.6, 280); // Limit max distance and scale down
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={planet.id}
              className="absolute cursor-pointer group z-10"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => onPlanetClick(planet)}
            >
              <div
                className="rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg group-hover:brightness-110 relative"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                  backgroundColor: planet.color,
                  boxShadow: `0 0 20px ${planet.color}50`,
                }}
              >
                {/* Saturn's rings */}
                {planet.id === 'saturn' && (
                  <>
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300 rounded-full opacity-60 pointer-events-none"
                      style={{
                        width: `${planet.size + 15}px`,
                        height: `${(planet.size + 15) * 0.3}px`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400 rounded-full opacity-40 pointer-events-none"
                      style={{
                        width: `${planet.size + 25}px`,
                        height: `${(planet.size + 25) * 0.3}px`,
                      }}
                    />
                  </>
                )}
                
                {/* Planet name label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {planet.spanishName}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 animate-pulse">
          🚀 Sistema Solar 🌟
        </h1>
        <p className="text-white/80 text-lg mt-2">¡Haz clic en los planetas para explorar!</p>
      </div>
    </div>
  );
};

export default SolarSystem;