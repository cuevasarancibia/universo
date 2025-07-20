import { Planet } from '../types';

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    spanishName: 'Mercurio',
    size: 20,
    color: '#8C7853',
    distance: 120,
    description: 'El planeta más cercano al Sol. Es muy caliente durante el día y muy frío por la noche.',
    funFact: '¡Un día en Mercurio dura 59 días terrestres!',
    audioText: 'Mercurio es el planeta más pequeño y cercano al Sol',
    moons: []
  },
  {
    id: 'venus',
    name: 'Venus',
    spanishName: 'Venus',
    size: 25,
    color: '#FFC649',
    distance: 150,
    description: 'El planeta más caliente del sistema solar. Está cubierto de nubes tóxicas.',
    funFact: '¡Venus gira al revés comparado con la Tierra!',
    audioText: 'Venus es conocido como la estrella de la mañana',
    moons: []
  },
  {
    id: 'earth',
    name: 'Earth',
    spanishName: 'Tierra',
    size: 28,
    color: '#6B93D6',
    distance: 180,
    description: 'Nuestro hogar. El único planeta conocido con vida. Tiene agua líquida y una atmósfera perfecta.',
    funFact: '¡La Tierra es el único planeta con vida conocida en todo el universo!',
    audioText: 'La Tierra es nuestro hermoso planeta azul',
    moons: ['Luna']
  },
  {
    id: 'mars',
    name: 'Mars',
    spanishName: 'Marte',
    size: 23,
    color: '#CD5C5C',
    distance: 210,
    description: 'El planeta rojo. Tiene casquetes polares y montañas enormes.',
    funFact: '¡Marte tiene el volcán más grande del sistema solar: el Monte Olimpo!',
    audioText: 'Marte es llamado el planeta rojo por su color',
    moons: ['Fobos', 'Deimos']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    spanishName: 'Júpiter',
    size: 45,
    color: '#D8CA9D',
    distance: 280,
    description: 'El planeta más grande. Es un gigante gaseoso con una gran mancha roja.',
    funFact: '¡Júpiter es tan grande que todos los demás planetas cabrían dentro de él!',
    audioText: 'Júpiter es el gigante del sistema solar',
    moons: ['Ío', 'Europa', 'Ganimedes', 'Calisto']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    spanishName: 'Saturno',
    size: 40,
    color: '#FAD5A5',
    distance: 340,
    description: 'Famoso por sus hermosos anillos hechos de hielo y roca.',
    funFact: '¡Saturno es tan ligero que flotaría en agua si hubiera un océano lo suficientemente grande!',
    audioText: 'Saturno es el señor de los anillos',
    moons: ['Titán', 'Encélado', 'Mimas']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    spanishName: 'Urano',
    size: 35,
    color: '#4FD0E3',
    distance: 400,
    description: 'Un planeta azul-verde que gira de lado. Es muy frío y ventoso.',
    funFact: '¡Urano gira completamente de lado, como una pelota rodando!',
    audioText: 'Urano es el planeta que rueda de lado',
    moons: ['Titania', 'Oberón', 'Umbriel']
  },
  {
    id: 'neptune',
    name: 'Neptune',
    spanishName: 'Neptuno',
    size: 33,
    color: '#4B70DD',
    distance: 460,
    description: 'El planeta más lejano y ventoso. Tiene vientos de hasta 2.100 km/h.',
    funFact: '¡Los vientos en Neptuno son los más rápidos del sistema solar!',
    audioText: 'Neptuno es el planeta de los vientos súper rápidos',
    moons: ['Tritón']
  }
];