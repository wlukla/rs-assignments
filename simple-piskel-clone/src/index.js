import './style.scss';
import 'normalize.css';
import './assets/img/trash-bin-icon.svg';

import Model from './model';
import View from './view';
import Controller from './controller';

const app = new Controller(new Model(), new View());
app.view.disableSmoothing();
