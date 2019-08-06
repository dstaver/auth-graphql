module.exports = {
  options: {
    connection: 'postgresql://postgres:porter2019@localhost:5432/postgres',
    dynamicJson: true,
    watch: true,
    schema: ['app', 'app_public', 'app_private'],
    defaultRole: 'postgres',
    enhanceGraphiql: true,
    cors: true,
    exportSchemaJson: './schema/schema.json',
    exportSchemaGraphql: './schema/schema.graphql',
    simpleCollections: 'only',
  },
};
