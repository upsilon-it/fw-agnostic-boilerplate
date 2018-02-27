import ko from 'knockout';
import App from './App';
import Item from './Item';

export const registerComponents = () => {
  ko.components.register('app', App);
  ko.components.register('item', Item);
};
