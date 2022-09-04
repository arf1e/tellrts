import {Anket} from '../Search/Search.graphql';

// Steps order
export const IMPRESSIONS = 'impressions';
export const BRIEFING = 'briefing';
export const QUESTIONS = 'questions';

export type STEP = typeof IMPRESSIONS | typeof BRIEFING | typeof QUESTIONS;
export const STEPS: STEP[] = [IMPRESSIONS, BRIEFING, QUESTIONS];

export type Guess = {
  questionId: number;
  answer: string;
};

export const generateAnketInitialValues = (anket: Anket) => {
  return {
    userId: anket.id,
    name: '',
    impressions: [],
    guesses: [],
  };
};
