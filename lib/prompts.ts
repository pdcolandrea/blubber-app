import prompts from '../assets/motivation.json';

const customAndTimeLength = prompts.rude.fail.customAndTime.length;

const isMean = true;
export const getFailedWeightPrompt = (weight: number, when: string) => {
  if (isMean) {
    const prompt = prompts.rude.fail.customAndTime[Math.floor(Math.random() * customAndTimeLength)];
    return prompt.message
      .replace('{x}', weight.toFixed(0))
      .replace('{time}', when)
      .replace('ago', '')
      .replace(' ?', '?')
      .replace(' ,', ',')
      .trim();
  } else {
    return `You're ${weight}lbs away from your goal weight`;
  }
};
