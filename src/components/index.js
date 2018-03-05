import ko from 'knockout';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';

import App from './App';
import FoodSection from './App/FoodSection';
import FoodSectionItem from './App/FoodSection/Item';

export const registerComponents = () => {
  ko.components.register('app', App);
  ko.components.register('food-section', FoodSection);
  ko.components.register('food-section-item', FoodSectionItem);
};
