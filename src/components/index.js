import ko from 'knockout';
import App from './App';
import FoodSection from './App/FoodSection';
import FoodSectionItem from './App/FoodSection/Item';

export const registerComponents = () => {
  ko.components.register('app', App);
  ko.components.register('food-section', FoodSection);
  ko.components.register('food-section-item', FoodSectionItem);
};
