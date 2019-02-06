import express from 'express';
import { createArticle, getArticle } from './modules/article';


const router = express.Router();

const routeHandler = ({ path, callback, method }) => {
  router.route(path)[method](async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      // rollbar.error(error);

      next(error);
    }
  });
};

// User routes
routeHandler({
  path: '/article',
  callback: createArticle,
  method: 'post'
});

routeHandler({
  path: '/article',
  callback: getArticle,
  method: 'get'
});


module.exports = router;

