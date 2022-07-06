import moment from 'moment';

const getAge = (birthday: string): number =>
  moment().diff(moment(birthday, 'DD-MM-YYYY'), 'years');

export default getAge;
