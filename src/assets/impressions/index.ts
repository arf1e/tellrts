const PRETTY = 'pretty';
const CUTE = 'cute';
const HOT = 'hot';
const SHY = 'shy';
const PARTY = 'party';
const ART = 'art';

export type ImpressionIcon =
  | typeof PRETTY
  | typeof CUTE
  | typeof HOT
  | typeof SHY
  | typeof PARTY
  | typeof ART;

const impressions: ImpressionIcon[] = [PRETTY, CUTE, HOT, SHY, PARTY, ART];

export const getImpressionTitle = (
  icon: ImpressionIcon,
  sex: 'male' | 'female',
) => `app.anket.impressions.${icon}.${sex}`;

export const getImpressionImage = (icon: ImpressionIcon) => {
  switch (icon) {
    case PRETTY:
      return require('./pretty.png');
    case CUTE:
      return require('./cute.png');
    case HOT:
      return require('./hot.png');
    case SHY:
      return require('./shy.png');
    case PARTY:
      return require('./party.png');
    case ART:
      return require('./art.png');
  }
};

export default impressions;
