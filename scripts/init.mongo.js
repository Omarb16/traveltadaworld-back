db.getCollection('users').insertMany([
  {
    email: 'Leanne@gmail.com',
    username: 'Leanne',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    phone: '+33784112245',
    nationality: 'France',
  },
  {
    email: 'Castaneda@gmail.com',
    username: 'Castaneda',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    phone: '+33784112246',
    nationality: 'France',
  },
  {
    email: 'Phyllis@gmail.com',
    username: 'Phyllis',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    phone: '+33784112247',
    nationality: 'France',
  },
  {
    email: 'Erika@gmail.com',
    username: 'Erika',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    phone: '+33784112249',
    nationality: 'France',
  },
  {
    email: 'Moody@gmail.com',
    username: 'Moody',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    phone: '+33784112248',
    nationality: 'France',
  },
]);

db.getCollection('users').createIndex({ email: 1 }, { unique: true });
