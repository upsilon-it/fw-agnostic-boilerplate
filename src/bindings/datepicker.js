import ko from 'knockout';
import $ from 'jquery';

const datepicker = {
  init(el, valueAccessor) {
    const $el = $(el);
    const options = ko.unwrap(valueAccessor()) || {};
    const { value, changeDate } = options;

    if (value) {
      $el.val(ko.unwrap(value));
    }

    $el.datepicker({
      autoclose: true,
      todayHighlight: true,
    });

    if (changeDate) {
      $el.on('changeDate', event => changeDate(event.target.value));
    }
  },

  update(el, valueAccessor) {
    const options = ko.unwrap(valueAccessor());
    const { value } = options;

    if (value) {
      $(el).val(ko.unwrap(value));
    }
  },
};

ko.bindingHandlers.datepicker = datepicker;

export default datepicker;
