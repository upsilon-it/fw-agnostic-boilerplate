import ko from 'knockout';
import feather from 'feather-icons';

const icon = {
  init(el, valueAccessor) {
    const value = valueAccessor() || {};
    const { name } = value;

    el.innerHTML = feather.icons[name].toSvg();
  },
};

ko.bindingHandlers.icon = icon;

export default icon;
