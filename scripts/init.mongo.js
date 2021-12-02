db.users.drop();

db.getCollection('users').insertMany([
  {
    email: 'Leanne@gmail.com',
    firstname: 'Leanne',
    lastname: 'Afice',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1988-01-01T23:00:00.000Z',
    description: 'Bonjour je suis Leanne. Enchanté !',
    address: 'Address',
    city: 'Seoul',
    country: 'Corée du sud',
    postalCode: '54500',
    phone: '+33610012536',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
  },
  {
    email: 'Castaneda@gmail.com',
    firstname: 'Phyllis',
    lastname: 'Castaneda',
    password: '$2b$10$BAo1UfthiTIjgW4H66KwKO8l4NH3tup8y8oMUmHQ0sb1dlLfirZ0i',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    birthDate: '1999-01-01T23:00:00.000Z',
    description:
      'Grand fan de voyages , je suis toujours à la quete de nouvelles experiences.',
    address: 'Address',
    city: 'Rome',
    country: 'Italy',
    postalCode: '54500',
    phone: '+33610012536',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
  },
]);

db.getCollection('users').createIndex({ email: 1 }, { unique: true });

db.getCollection('users')
  .find({})
  .forEach(function (e) {
    db.getCollection('users').update(
      { _id: e._id },
      { $set: { createdBy: e._id } },
    );
  });

var userData = db.getCollection('users').find({ email: 'Leanne@gmail.com' });

db.trips.drop();

db.getCollection('trips').insertMany([
  {
    title: 'Escapade à Rome en 5 jours',
    description: 'Votre séjour à Rome',
    detail:
      "Rome, une ville atypique où tous les styles architecturales se mélangent et se marient à merveille. Du médiéval, au romain, en passant par le baroque, les nombreux édifices romains traduisent une histoire longue de 28 siècles. Tel un musée grandeur nature, la ville vous offrira ses trésors et vous promet bien de visites et de découvertes au cours d’un séjour en Europe inoubliable. Vacances Bleues vous propose de partir en Italie, pour découvrir ou re-découvri <br>Rome l'éternelle, l'antique, le Vatican et la bucolique Tivoli. ",
    price: 500,
    dateBegin: ISODate('2021-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2021-12-23T23:00:00.000Z'),
    city: 'Rome',
    country: 'Italy',
    photo:
      'https://cdn.pixabay.com/photo/2017/03/17/13/53/rome-2151629_960_720.jpg',

    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Escapade a Milan',
    description: 'Milan vu d une autre maniére',
    detail:
      "Milan, une ville atypique où tous les styles architecturales se mélangent et se marient à merveille. Du médiéval, au romain, en passant par le baroque, les nombreux édifices romains traduisent une histoire longue de 28 siècles. Tel un musée grandeur nature, la ville vous offrira ses trésors et vous promet bien de visites et de découvertes au cours d’un séjour en Europe inoubliable. Vacances Bleues vous propose de partir en Italie, pour découvrir ou re-découvrir <br> Milan l'éternelle, l'antique, le Vatican et la bucolique Tivoli. ",
    price: 500,
    dateBegin: ISODate('2021-12-20T23:00:00.000Z'),
    dateEnd: ISODate('2022-01-02T23:00:00.000Z'),
    city: 'Milan',
    country: 'Italy',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Florence',
    description: 'Florence',
    detail:
      "MilFlorencean, une ville atypique où tous les styles architecturales se mélangent et se marient à merveille. Du médiéval, au romain, en passant par le baroque, les nombreux édifices romains traduisent une histoire longue de 28 siècles. Tel un musée grandeur nature, la ville vous offrira ses trésors et vous promet bien de visites et de découvertes au cours d’un séjour en Europe inoubliable. Vacances Bleues vous propose de partir en Italie, pour découvrir ou re-découvrir <br>Milan l'éternelle, l'antique, le Vatican et la bucolique Tivoli. ",
    price: 500,
    dateBegin: ISODate('2021-12-24T23:00:00.000Z'),
    dateEnd: ISODate('2022-03-12T23:00:00.000Z'),
    city: 'Florence',
    country: 'Italy',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'A Naples comme à la maison',
    description: 'Sejour à Naples',
    detail:
      "Il nostro concetto di ospitalità va oltre i comuni hotel e B&B perchè le nostre case danno la possibilità a famiglie numerose o gruppi di amici di condividere le emozioni vere e stare insieme, sorseggiando vino o the in salotto, cucinando antiche ricette e cenare insieme alla stessa tavola.<br>Dedicare il giusto tempo ai propri cari è l'essenza della qualità della vita, per emozioni che rimarranno impresse nel proprio cuore e nel cuore di Napoli. ",
    price: 500,
    dateBegin: ISODate('2022-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-02T23:00:00.000Z'),
    city: 'Naples',
    country: 'Italy',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Rome en weekend',
    description: 'Petit weekend à rome',
    detail:
      "Rome, une ville atypique où tous les styles architecturales se mélangent et se marient à merveille. Du médiéval, au romain, en passant par le baroque, les nombreux édifices romains traduisent une histoire longue de 28 siècles. Tel un musée grandeur nature, la ville vous offrira ses trésors et vous promet bien de visites et de découvertes au cours d’un séjour en Europe inoubliable. Vacances Bleues vous propose de partir en Italie, pour découvrir ou re-découvri <br>Rome l'éternelle, l'antique, le Vatican et la bucolique Tivoli. ",
    price: 120,
    dateBegin: ISODate('2023-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-22T23:00:00.000Z'),
    city: 'Rome',
    country: 'Italy',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Weekend à Séoul',
    description: 'Petit weekend à seoul',
    detail:
      'MONT SEORAK / SÉOUL<br><li>Ce matin, un téléphérique vous amènera à la forteresse Gwongeumseong et à son ermitage. Puis, découverte du temple Sinheung-sa, l un des plus anciens du pays. Départ pour Gapyeong, visite du jardin du matin calme, réputé pour ses fleurs et arbres sauvages uniques. (de janvier à avril, et de novembre à décembre, la visite du jardin sera remplacée par la visite du studio de tournage Yangpyeong et de ses plateaux). Retour à Séoul. Temps libre.<li> SÉOUL / MINSOK / MONT SONGNI / DAEGUEn route pour Daegu, visite de Minsok, village folklorique composé de maisons traditionnelles coréennes des XVIIIe et XIXe siècles, provenant de différentes provinces. Continuation vers le Mont Songni et balade dans le parc national de Songni-san couvert de forêts de pins et d’une flore variée. Visite du temple Beopju-sa, célèbre pour sa pagode en bois à cinq étages et sa statue du plus grand bouddha en bronze du pays. Arrivée à Daegu en fin de journée. ',
    city: 'Seoul',
    price: 1000,
    country: 'Corée du sud',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    dateBegin: ISODate('2023-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-22T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },

  {
    title: 'Weekend à Seoul ',
    description: 'Venez decouvrir le night market de seoul ',
    detail:
      'Seoul connu pour ces nightmarket et gastronomie.<br>Grosse soirée assuré ',
    price: 120,
    dateBegin: ISODate('2023-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-22T23:00:00.000Z'),
    city: 'Seoul',
    country: 'Corée du sud',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Jeju Island',
    description: 'Circuit Jeju Island',
    details:
      "<li>JOUR 1: SÉOUL<br>Arrivée à l'aéroport international d’Incheon. Accueil et transfert jusqu'à votre hôtel en voiture privée (sans guide). Reste de la journée et repas libres. <br><li>JOUR 2 : GYEONGJU / BUSAN<br>Route pour Busan. En chemin, visite du temple d'Unmun-sa, construit au VIe siècle et entouré d'une magnifique forêt de pins. Continuation vers Busan, à la pointe sud-est du pays et qui 'étire le long de la mer de l'est. La ville est renommée pour ses magnifiques plages, ses sites historiques et son dynamisme culturel, notamment grâce au Festival International du Film de Busan. A l'arrivée, découverte de la rue Nampodong, ses boutiques, cinémas et du marché aux poissons de Jagalchi. Puis, transfert à la tour de Busan depuis laquelle vous aurez une vue grandiose sur la métropole et ses alentours.<br><br><li>JOUR 3 : BUSAN / MONT GAYA / ANDONG / CHUNGJU<br>Départ pour le mont Gaya, dont les rochers abrupts ressemblent à un paravent coréen en plusieurs panneaux peints. Visite du temple Haein-sa qui conserve un grand nombre de trésors artistiques répartis dans plus de 90 édifices (sanctuaires, ermitages et temples secondaires), éparpillés sur 80 ha. Il abrite notamment le célèbre trésor culturel coréen inscrit au patrimoine mondial de l'Uneco, 80 000 tablettes de bois servant à imprimer le Tripitaka Koreana, ensemble de textes bouddhiques le plus complet d’Extrême Orient. Route vers Andong, qui a conservé ses maisons nobles de style traditionnel. Le village Hahoe à Andong est très réputé pour sa danse des masques. Continuation vers Chungju.<br><li><br>JOUR 4 : MONT ODAE /GANGNEUNG / DMZ (GOSEONG) / MONT SEORAK<br>Les rituels bouddhistes commencent à l’aube, la méditation zen peut être éprouvante physiquement. Réveil à 3h du matin pour les volontaires. Après le petit-déjeuner, route vers Gangneung et visite du musée Chamsori qui possède une étonnante collection de gramophones datant du XIXe siècle et de la première génération de systèmes audio. Continuation vers le musée de la DMZ de Goseong où vous pourrez en apprendre davantage sur l'Histoire de la Corée mais aussi sur la faune et la flore locales. Puis, départ pour l’observatoire de l'unification en zone démilitarisée (DMZ) sur la ligne de démarcation pour un coup d’œil sur la Corée du Nord. Route vers le parc national du mont Seorak. Nuit au Mont Seorak. ",
    price: 500,
    dateBegin: ISODate('2023-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-22T23:00:00.000Z'),
    city: 'Jeju Island',
    country: 'Corée du sud',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
  {
    title: 'Ville de Busan',
    description: 'Petit circuit à Busan',
    detail:
      "<li>JOUR 1: SÉOUL Arrivée à l'aéroport international d’Incheon. Accueil et transfert jusqu'à votre hôtel en voiture privée (sans guide). Reste de la journée et repas libres. <br><li>JOUR 2 : BUSAN Journée consacrée à la découverte de Séoul. Visite du palais Changdeok, résidence de nombreux rois de la dynastie Joseon, classé au patrimoine mondial de l’Unesco, et de son jardin secret, Biwon, un parc de 110 hectares abritant pagodes et pavillons, destiné aux loisirs de la cour. Puis, balade dans le marché Gwangjang, célèbre pour sa succulente street food. Visite du musée national, construit en 2005 dans le parc de Yongsan, c’est le 6e plus grand musée au monde, plus de 10 000 œuvres y sont présentées, une fabuleuse introduction à l’Histoire et aux arts coréens. Coup d’œil sur la ville du sommet de la N Seoul Tower, érigée sur la montagne du sud. <br><li>JOUR 3 : SÉOUL / MINSOK / MONT SONGNI / DAEGUEn route pour Daegu, visite de Minsok, village folklorique composé de maisons traditionnelles coréennes des XVIIIe et XIXe siècles, provenant de différentes provinces. Continuation vers le Mont Songni et balade dans le parc national de Songni-san couvert de forêts de pins et d’une flore variée. Visite du temple Beopju-sa, célèbre pour sa pagode en bois à cinq étages et sa statue du plus grand bouddha en bronze du pays. Arrivée à Daegu en fin de journée. <br><li><br>JOUR 4 : DAEGU / GYEONGJU<br>Dans la matinée, promenade dans le marché aux plantes médicinales de Daegu, actif depuis le XVIIe siècle, et bain de pieds aux herbes. La salle d'exposition vous permettra d'en apprendre davatange sur les propriétés curatives des plantes. Puis, visite du marché de Seomun qui fut un des plus importants du pays durant l'époque Joseon. Route pour Gyeongju, ancienne capitale du Royaume de Silla, au début de notre ère. Découverte de l'observatoire de Cheomseongdae, l'un des plus vieux d’Asie puis du parc royal des Tumuli qui abrite un grand nombre de tombes royales. ",
    price: 500,
    dateBegin: ISODate('2023-12-02T23:00:00.000Z'),
    dateEnd: ISODate('2023-12-22T23:00:00.000Z'),
    city: 'Busan',
    price: 100,
    country: 'Corée du sud',
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    createdAt: ISODate('2021-11-01T23:00:00.000Z'),
    createdBy: userData._id,
    createdNameBy: userData.firstname,
  },
]);
