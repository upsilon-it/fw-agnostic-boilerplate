const sections = [
  {
    id: 1,
    name: 'Салаты',
  },
  {
    id: 2,
    name: 'Супы',
  },
  {
    id: 3,
    name: 'Вторые блюда',
  },
  {
    id: 4,
    name: 'Гарниры',
  },
];

const products = [
  {
    id: 1,
    name: 'Греческий',
    price: 1,
    composition: 'Говядина',
    section_id: 1,
  },
  {
    id: 2,
    name: 'Шуба',
    price: 2,
    composition: 'Говядина',
    section_id: 1,
  },
  {
    id: 3,
    name: 'Оливье',
    price: 3,
    composition: 'Говядина',
    section_id: 1,
  },
  {
    id: 4,
    name: 'Борщ',
    price: 4,
    composition: 'Мясо',
    section_id: 2,
  },
  {
    id: 5,
    name: 'Перловый',
    price: 5,
    composition: 'Картоха',
    section_id: 2,
  },
  {
    id: 6,
    name: 'Мясо',
    price: 6,
    composition: 'Мясо',
    section_id: 3,
  },
  {
    id: 7,
    name: 'Пельмешки',
    price: 7,
    composition: 'Какахи',
    section_id: 3,
  },
  {
    id: 8,
    name: 'Картоха',
    price: 8,
    composition: 'Картоха',
    section_id: 4,
  },
  {
    id: 9,
    name: 'Вермешелька',
    price: 9,
    composition: 'Тесто',
    section_id: 4,
  },
];

export default {
  getSections() {
    return new Promise(resolve => setTimeout(() => resolve(sections), 2000));
  },

  getProducts() {
    return new Promise(resolve => setTimeout(() => resolve(products), 5000));
  },

  makeOrder(orders) {
    console.log(orders);
  },
};
