import ko from 'knockout';
import $ from 'jquery';

const collapse = {
  init(el, valueAccessor) {
    const value = ko.unwrap(valueAccessor());

    $(el).collapse({ toggle: value });
  },

  update(el, valueAccessor) {
    const value = ko.unwrap(valueAccessor());

    $(el).collapse(value ? 'hide' : 'show');
  },
};

ko.bindingHandlers.collapse = collapse;

export default collapse;
