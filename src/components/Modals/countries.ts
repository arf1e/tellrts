import countries from '../../utils/countries';

export const getCountriesByName = (name: string, lang: 'ru' | 'en' = 'ru') =>
  name.trimStart().length > 0
    ? countries.filter(el =>
        el.name[lang].toLowerCase().startsWith(name.trimStart().toLowerCase()),
      )
    : [];

export const getCountryNameByCode = (
  code: string,
  lang: 'ru' | 'en' = 'ru',
) => {
  const country = countries.find(c => c.code === code);
  if (!country) {
    return '';
  }
  return country.name[lang];
};

export default countries;
