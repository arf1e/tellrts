export type Country = {
  name: {
    en: string;
    ru: string;
  };
  code: string;
};

const countries: Country[] = [
  {
    name: {
      en: 'Armenia',
      ru: 'Армения',
    },
    code: 'AM',
  },
  {name: {en: 'Azerbaijan', ru: 'Азербайджан'}, code: 'AZ'},
  {name: {en: 'Belarus', ru: 'Беларусь'}, code: 'BY'},
  {name: {en: 'Bulgaria', ru: 'Болгария'}, code: 'BG'},
  {name: {en: 'Estonia', ru: 'Эстония'}, code: 'EE'},
  {name: {en: 'Georgia', ru: 'Грузия'}, code: 'GE'},
  {name: {en: 'Israel', ru: 'Израиль'}, code: 'IL'},
  {name: {en: 'Kazakhstan', ru: 'Казахстан'}, code: 'KZ'},
  {name: {en: 'Kyrgyzstan', ru: 'Киргизия'}, code: 'KG'},
  {name: {en: 'Latvia', ru: 'Латвия'}, code: 'LV'},
  {name: {en: 'Lithuania', ru: 'Литва'}, code: 'LT'},
  {name: {en: 'Moldova, Republic of', ru: 'Молдавия'}, code: 'MD'},
  {name: {en: 'Romania', ru: 'Румыния'}, code: 'RO'},
  {name: {en: 'Russian Federation', ru: 'Россия'}, code: 'RU'},
  {name: {en: 'Turkmenistan', ru: 'Туркмения'}, code: 'TM'},
  {name: {en: 'Uzbekistan', ru: 'Узбекистан'}, code: 'UZ'},
];

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
