export const LOW = 'low';
export const MEDIUM = 'medium';
export const GOOD = 'good';
export const HUNDRED = 'hundred';

export type GRADE = typeof LOW | typeof MEDIUM | typeof GOOD | typeof HUNDRED;

export const gradeResult = (successRate: number) => {
  if (successRate >= 50 && successRate < 70) {
    return MEDIUM;
  }
  if (successRate >= 70 && successRate < 100) {
    return GOOD;
  }
  if (successRate === 100) {
    return HUNDRED;
  }
  return LOW;
};

export const getSuccessRateText = (
  successRate: number,
): {title: string; description: string} => {
  const grade = gradeResult(successRate);

  const mapper = {
    [LOW]: {
      title: 'app.anket.rate.low.title',
      description: 'app.anket.rate.low.description',
    },
    [MEDIUM]: {
      title: 'app.anket.rate.medium.title',
      description: 'app.anket.rate.medium.description',
    },
    [GOOD]: {
      title: 'app.anket.rate.good.title',
      description: 'app.anket.rate.good.description',
    },
    [HUNDRED]: {
      title: 'app.anket.rate.hundred.title',
      description: 'app.anket.rate.hundred.description',
    },
  };

  return mapper[grade];
};
