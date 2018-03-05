class Item {
  constructor({ product, orderItem, unorderItem }) {
    this.product = product;
    this.orderItem = () => orderItem(this.product);
    this.unorderItem = () => unorderItem(this.product);
  }
}

export default Item;
