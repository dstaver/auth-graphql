const express = require('express');
const { postgraphile } = require('postgraphile');
const jwt = require('jsonwebtoken');

const app = express();

const jwtSecret = 'coffeehippoanxiety';

app.use(
  postgraphile(
    'postgresql://postgres:porter2019@localhost:5432/postgres',
    ['public'],
    {
      // pgDefaultRole: 'auth_anonymous',
      dynamicJson: true,
      watchPg: true,
      enableCors: true,
      exportSchemaJson: './schema/schema.json',
      exportSchemaGraphql: './schema/schema.graphql',
      simpleCollections: 'only',
      ignoreRBAC: false,
      graphiql: true,
      enhanceGraphiql: true,
      showErrorStack: true,
      extendedErrors: [
        'severity',
        'code',
        'detail',
        'hint',
        'position',
        'internalPosition',
        'internalQuery',
        'where',
        'schema',
        'table',
        'column',
        'dataType',
        'constraint',
        'file',
        'line',
        'routine',
      ],
      // jwtSecret,
      // jwtPgTypeIdentifier: 'auth_public.jwt',
      // jwtVerifyOptions: {
      //   audience: null,
      // },
    }
  )
);

// A fictional route that generates different jwt tokens for different roles so you can use for testing different fetch from graphhql
app.get('/login', (req, res, next) => {
  res.json({
    1: jwt.sign({ role: 'user_login', user_id: 1 }, jwtSecret, {}),
    2: jwt.sign({ role: 'user_login', user_id: 2 }, jwtSecret, {}),
    3: jwt.sign({ role: 'user_login', user_id: 3 }, jwtSecret, {}),
    admin: jwt.sign({ role: 'user_admin', user_id: 0 }, jwtSecret, {}),
  });
});

app.listen(5000);
console.log(`App is running on 5000`);
