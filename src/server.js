import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// QUERY PARAMETERS => URL Statefull => Filtros, paginação; não são obrigatórios
// ROUTE PARAMETERS => Identificação de recurso
// REQUEST BODY => Envio de infos de um formulário (HTTPS)

// GET https://localhost:3333/users?userId=1
// DELETE https://localhost:3333/users/1

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = extractQueryParams(query) || {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not found!');
});

server.listen(3333);
