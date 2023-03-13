import Express from 'express';
import Sse from '../controllers/sse';

class sseRouter extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Sse.sseTest);
  }

}

export default new sseRouter();
