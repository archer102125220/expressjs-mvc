import createError from 'http-errors';
import Express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import JWTMiddleware from './middlewares/JWT';
import uploader from './middlewares/uploader';

class App extends Express {
  constructor(porps) {
    super(porps);
    this.init();
  }

  middlewares = [
    logger('dev'),//將執行途中的狀態(如：errorMessage、warning等)console出來  https://andy6804tw.github.io/2017/12/27/middleware-tutorial/
    Express.json(),
    Express.urlencoded({ extended: false }),
    cookieParser(),
    Express.static(path.join(__dirname, 'public')),//https://expressjs.com/zh-tw/starter/static-files.html
    cors(),
    JWTMiddleware.unless({ path: [
      '/',
      /^\/api\/users\/account\/.*/,
      '/api/users/registered',
      '/api/users/img_upload_test',
      '/api/users/login'
    ]}),
    uploader.avater()
  ]

  routesWeb = [
    { prefix: '/', route: indexRouter },
  ]

  routesApi = [
    { prefix: '/users', route: usersRouter }
  ]

  setting = {
    'views': path.join(__dirname, 'views'),
    'view engine': 'ejs',
    'trust proxy': true
  }

  init = () => {
    for (const key in this.setting) {
      this.set(key, this.setting[key]);
    }

    this.middlewares.forEach(element => {
      if (Array.isArray(element)) {
        this.use(element[0], element[1]);
      } else if (typeof (element) !== 'undefined') {
        this.use(element);
      }
    });

    this.routesWeb.forEach(element => {
      this.use(element.prefix, element.route);
    });
    this.routesApi.forEach(element => {
      this.use('/api' + element.prefix, element.route);
    });

    // catch 404 and forward to error handler
    this.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.use(function (err, req, res, next) {
      if(err.name === 'UnauthorizedError'){
        console.error('invalid token');
        res.status(401).send('invalid token');
        return;
      }
      // set locals, only providing error in development
      /*if(err.name === 'UnauthorizedError'){
        res.locals.message = 'invalid token';
        res.locals.error = {};
      }else{*/
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      //}

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }

}

export default new App();
