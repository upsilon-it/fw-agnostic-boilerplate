import ko from 'knockout';

class FoodSection {
  constructor({ name, items }) {
    this.name = name;
    this.items = items;
    this.isColapsed = ko.observable(false);
  }

  toggleCollapse() {
    this.isColapsed(!this.isColapsed());
  }
}

export default FoodSection;
