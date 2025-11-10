
import { BpmData, Color } from '../types';

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const lowEnergyWords = ['serene', 'tranquil', 'gentle', 'calm', 'peaceful', 'ethereal'];
const midEnergyWords = ['balanced', 'flowing', 'harmonious', 'steady', 'rhythmic'];
const highEnergyWords = ['vibrant', 'energetic', 'intense', 'powerful', 'dynamic', 'passionate'];

const lowVolatilityWords = ['smooth', 'soft', 'blended', 'seamless', 'hazy', 'misty'];
const midVolatilityWords = ['textured', 'layered', 'swirling', 'interwoven', 'undulating'];
const highVolatilityWords = ['chaotic', 'explosive', 'turbulent', 'sharp', 'fragmented', 'crystalline'];

const smallRangeWords = ['subtle gradients', 'monochromatic whispers', 'nuanced tones'];
const largeRangeWords = ['high-contrast depths', 'dramatic tonal shifts', 'a broad spectrum of light'];

export const createPromptFromBpm = (bpmData: BpmData, color: Color): string => {
  const sum = bpmData.reduce((a, b) => a + b, 0);
  const avgBpm = sum / bpmData.length;
  const minBpm = Math.min(...bpmData);
  const maxBpm = Math.max(...bpmData);
  const range = maxBpm - minBpm;

  const stdDev = Math.sqrt(bpmData.map(x => Math.pow(x - avgBpm, 2)).reduce((a, b) => a + b, 0) / bpmData.length);

  let energyWord: string;
  if (avgBpm < 75) energyWord = getRandomElement(lowEnergyWords);
  else if (avgBpm < 110) energyWord = getRandomElement(midEnergyWords);
  else energyWord = getRandomElement(highEnergyWords);

  let volatilityWord: string;
  if (stdDev < 5) volatilityWord = getRandomElement(lowVolatilityWords);
  else if (stdDev < 15) volatilityWord = getRandomElement(midVolatilityWords);
  else volatilityWord = getRandomElement(highVolatilityWords);
  
  let rangeDesc: string;
  if (range < 20) rangeDesc = getRandomElement(smallRangeWords);
  else rangeDesc = getRandomElement(largeRangeWords);

  return `An ultra-high quality, abstract image. A fluid and organic masterpiece, dominated by the essence of ${color.toLowerCase()}. 
  It captures a ${energyWord} feeling with ${volatilityWord} forms. 
  A strong, blown-out flash of pure light radiates from the center, creating ${rangeDesc}. 
  The entire composition is hazy and dreamlike. 
  There are absolutely no lines, text, or numbers visible. Focus on pure color, light, and emotion.`;
};
