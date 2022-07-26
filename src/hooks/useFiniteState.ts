import {useState} from 'react';

export const IDLE = 'IDLE';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

type STATE = typeof IDLE | typeof LOADING | typeof ERROR;

type useFiniteStateReturn = [
  state: STATE,
  setters: {
    setLoading: () => void;
    setError: (error?: string) => void;
    setIdle: () => void;
  },
  error: string,
  states: {
    IDLE: typeof IDLE;
    LOADING: typeof LOADING;
    ERROR: typeof ERROR;
  },
];

const useFiniteState = (): useFiniteStateReturn => {
  const [state, setState] = useState<STATE>(IDLE);
  const [currentError, setCurrentError] = useState<string>('');

  const setLoading = () => {
    console.log('set loading');
    setCurrentError('');
    setState(LOADING);
  };
  const setError = (error: string = 'UNKNOWN ERROR') => {
    setState(ERROR);
    setCurrentError(error);
  };
  const setIdle = () => {
    setCurrentError('');
    setState(IDLE);
  };

  return [
    state,
    {setLoading, setError, setIdle},
    currentError,
    {IDLE, LOADING, ERROR},
  ];
};

export default useFiniteState;
