export interface Planet {
  id: string;
  name: string;
  spanishName: string;
  size: number;
  color: string;
  distance: number;
  description: string;
  funFact: string;
  moons?: string[];
  audioText: string;
}

export interface GameQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}