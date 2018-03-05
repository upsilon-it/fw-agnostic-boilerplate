import ko from 'knockout';
import service from './service';
import './styles.less';

class App {
  constructor() {
    this.orders = ko.observableArray([]);
    this.basket = ko.observableArray([]);
    this.sections = ko.observableArray([]);
    this.products = ko.observableArray([]);
    this.activeDate = ko.observable('03/05/2018');

    this.sectionItems = ko.pureComputed(() => {
      const sections = this.sections();
      const products = this.products();
      const orders = this.getActiveDateOrders();

      return sections.map(section => ({
        ...section,
        items: products
          .filter(product => product.section_id === section.id)
          .map(product => ({
            ...product,
            order: orders.find(order => order.product_id === product.id),
          })),
      }));
    });

    this.price = ko.pureComputed(() => {
      const products = this.products();

      return this.getActiveDateOrders().reduce((sum, order) => {
        const product = products.find(({ id }) => id === order.product_id);

        if (product) {
          return sum + order.count() * product.price;
        }

        return sum;
      }, 0);
    });

    this.priceView = ko.pureComputed(() => {
      return `${this.price()} руб`;
    });

    service.getSections().then(data => this.sections(data));

    service.getProducts().then(data => this.products(data));
  }

  getActiveDateOrders() {
    const activeDate = this.activeDate();

    return this.basket().filter(({ date }) => date === activeDate);
  }

  orderItem(product) {
    const { order } = product;

    if (order) {
      order.count(order.count() + 1);
    } else {
      const orders = this.basket();

      orders.push(this.buildOrder(product));
      this.basket(orders);
    }
  }

  unorderItem({ order }) {
    if (order) {
      const count = Math.max(order.count() - 1, 0);

      if (count) {
        order.count(count);
      } else {
        const orders = this.basket();

        orders.splice(orders.indexOf(order), 1);
        this.basket(orders);
      }
    }
  }

  buildOrder({ id }) {
    return {
      product_id: id,
      date: this.activeDate(),
      count: ko.observable(1),
    };
  }

  changeDate(date) {
    this.activeDate(date);
  }

  makeOrder() {
    const orders = this.getActiveDateOrders();

    return service.makeOrder(ko.toJS(orders));
  }
}

export default App;
