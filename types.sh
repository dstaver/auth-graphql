apollo client:codegen generate \
--localSchemaFile=schema/schema.json \
--includes=./src/**/queries.ts \
--addTypename \
--target typescript
