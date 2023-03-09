import Express from 'express';
import Index from './../controllers/index';

class router extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Index.homePage);
    this.get('/sse', Index.sseTest);
  }

}

export default new router();
