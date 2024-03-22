import Controller from './controllers/controller';
import App from './core/app';

const app = new App(new Controller(), document.body);
app.start();
