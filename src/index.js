import ko from 'knockout';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { registerComponents } from './components';
import './bindings';

registerComponents();

ko.applyBindings();
