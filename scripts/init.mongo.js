db.users.drop();

db.getCollection('users').insertMany([
  {
    email: 'Leanne@gmail.com',
    firstname: 'Leanne',
    lastname: 'Afice',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1974-01-01T23:00:00.000Z',
    description: 'Description',
    address: 'Address',
    city: 'Nancy',
    country: 'France',
    postalCode: '54500',
    phone: '+33610012536',
  },
  {
    email: 'Castaneda@gmail.com',
    firstname: 'Phyllis',
    lastname: 'Castaneda',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1974-01-01T23:00:00.000Z',
    description: 'Description',
    address: 'Address',
    city: 'Nancy',
    country: 'France',
    postalCode: '54500',
    phone: '+33610012536',
  },
  {
    email: 'Phyllis@gmail.com',
    firstname: 'Castaneda',
    lastname: 'Phyllis',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1974-01-01T23:00:00.000Z',
    description: 'Description',
    address: 'Address',
    city: 'Nancy',
    country: 'France',
    postalCode: '54500',
    phone: '+33610012536',
  },
  {
    email: 'Erika@gmail.com',
    firstname: 'Erika',
    lastname: 'Moody',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1974-01-01T23:00:00.000Z',
    description: 'Description',
    address: 'Address',
    city: 'Nancy',
    country: 'France',
    postalCode: '54500',
    phone: '+33610012536',
  },
  {
    email: 'Moody@gmail.com',
    firstname: 'Moody',
    lastname: 'Erika',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1974-01-01T23:00:00.000Z',
    description: 'Description',
    address: 'Address',
    city: 'Nancy',
    country: 'France',
    postalCode: '54500',
    phone: '+33610012536',
  },
]);

db.getCollection('users').createIndex({ email: 1 }, { unique: true });

db.trips.drop();

db.getCollection('trips').insertMany([
  {
    title: 'Title',
    description: 'Descreiption',
    destination: {
      city: 'Lyon',
      country: 'France',
    },
    photo: 'https://randomuser.me/portraits/women/59.jpg',
  },
  {
    title: 'afvbrb',
    description: 'zzafadv',

    destination: {
      city: 'Paris',
      country: 'France',
    },
    photo: 'https://randomuser.me/portraits/women/59.jpg',
  },
  {
    title: 'Titlzvrbne',
    description: 'vvvdce',

    destination: {
      city: 'Madrid',
      country: 'Espagne',
    },
    photo: 'https://randomuser.me/portraits/women/59.jpg',
  },
  {
    title: 'zee',
    description: 'Description',

    destination: {
      city: 'Nancy',
      country: 'France',
    },
    photo: 'https://randomuser.me/portraits/women/59.jpg',
  },
]);
