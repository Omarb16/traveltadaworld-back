db.users.drop();

db.getCollection('users').insertMany([
  {
    email: 'Leanne@gmail.com',
    firstname: 'Leanne',
    lastname: 'Leanne',
    password: 'aaAA12--',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    nationality: 'France',
  },
  {
    email: 'Castaneda@gmail.com',
    firstname: 'Castaneda',
    lastname: 'Castaneda',
    password: 'aaAA12--',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    nationality: 'France',
  },
  {
    email: 'Phyllis@gmail.com',
    firstname: 'Phyllis',
    lastname: 'Phyllis',
    password: 'aaAA12--',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    nationality: 'France',
  },
  {
    email: 'Erika@gmail.com',
    firstname: 'Erika',
    lastname: 'Erika',
    password: 'aaAA12--',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    nationality: 'France',
  },
  {
    email: 'Moody@gmail.com',
    firstname: 'Moody',
    lastname: 'Moody',
    password: 'aaAA12--',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    nationality: 'France',
  },
]);

db.getCollection('users').createIndex({ email: 1 }, { unique: true });

db.getCollection('trips').insertMany([
  {
    title: 'Title',
    description: 'Description',
    destination: 'Destination',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-27T23:00:00.000Z'),
  },
  {
    title: 'Title',
    description: 'Description',
    destination: 'Destination',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-27T23:00:00.000Z'),
  },
  {
    title: 'Title',
    description: 'Description',
    destination: 'Destination',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-27T23:00:00.000Z'),
  },
  {
    title: 'Title',
    description: 'Description',
    destination: 'Destination',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-27T23:00:00.000Z'),
  },
]);
