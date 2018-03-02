import ko from 'knockout';
const sections = ko.observableArray([
  {
    name: 'Салаты',
    items: [
      {
        productName: 'Греческий',
        price: '100500',
        composition: 'Жадина-говядина',
      },
      {
        productName: 'Шуба',
        price: '100500',
        composition: 'Жадина-говядина',
      },
      {
        productName: 'Оливье',
        price: '100500',
        composition: 'Жадина-говядина',
      },
    ],
  },
  {
    name: 'Супы',
    items: [
      {
        productName: 'Борщ',
        price: '100500',
        composition: 'Мясо',
      },
      {
        productName: 'Перловый',
        price: '100500',
        composition: 'Картоха',
      },
    ],
  },
  {
    name: 'Вторые блюда',
    items: [
      {
        productName: 'Мясо',
        price: '100500',
        composition: 'Мясо',
      },
      {
        productName: 'Пельмешки',
        price: '100500',
        composition: 'Какахи',
      },
    ],
  },
  {
    name: 'Гарниры',
    items: [
      {
        productName: 'Картоха',
        price: '100500',
        composition: 'Картоха',
      },
      {
        productName: 'Вермешелька',
        price: '100500',
        composition: 'Тесто',
      },
    ],
  },
]);

class App {
  constructor() {
    this.sections = sections;
  }
}

export default App;
