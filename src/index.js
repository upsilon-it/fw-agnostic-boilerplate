import ko from 'knockout';

import { registerComponents } from './components';
import './bindings';

registerComponents();

ko.applyBindings();
