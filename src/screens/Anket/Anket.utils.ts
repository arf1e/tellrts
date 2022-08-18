import {Guess} from './Anket.types';

type MaybeHasValue = string | null;

export const checkIfFieldsHaveValues = (...fields: MaybeHasValue[]) => {
  const fieldsWithValues = fields.filter(elt => Boolean(elt));
  return fieldsWithValues.length === fields.length;
};

export const updateOrCreateGuess = (
  guesses: Guess[],
  guess: string,
  questionId: number,
) => {
  const guessExists = guesses.find(elt => elt.questionId === questionId);

  if (!guessExists || guesses.length === 0) {
    return [...guesses, {questionId, answer: guess}];
  }
  const guessIndex = guesses.indexOf(guessExists);
  console.log('guessIndex', guessIndex);
  const guessesCopy = [...guesses];
  guessesCopy[guessIndex].answer = guess;
  return guessesCopy;
};

export const getCurrentGuess = (guesses: Guess[], questionId: number) => {
  const guessExists = guesses.find(elt => elt.questionId === questionId);
  if (!guessExists) {
    return undefined;
  }

  const guessIndex = guesses.indexOf(guessExists);
  return guesses[guessIndex].answer;
};
