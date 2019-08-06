npx postgraphile -c \
postgresql://postgres:porter2019@localhost:5432/postgres \
--dynamic-json \
--watch \
--schema public \
--default-role postgres \
--enhance-graphiql --cors \
--export-schema-json ./schema/schema.json \
--export-schema-graphql ./schema/schema.graphql \
--simple-collections only