const users = [
  {
    name: '유비',
    birthYear: 161,
    nationality: '촉',
  },
  {
    name: '손권',
    birthYear: 182,
    nationality: '오',
  },
  {
    name: '관우',
    birthYear: 160,
    nationality: '촉',
  },
  {
    name: '장비',
    birthYear: 168,
    nationality: '촉',
  },
  {
    name: '조조',
    birthYear: 155,
    nationality: '위',
  },
  {
    name: '손권',
    birthYear: 182,
    nationality: '오',
  },
].filter(u => u.nationality === '촉');
const log = user => console.log(user);
users.forEach(log);
