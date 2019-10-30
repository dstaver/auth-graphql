# Postgraphile jwt RLS

This is a simple [expressjs](https://expressjs.com/) demo project created based on [Row Level Security in Postgraphile](https://www.graphile.org/postgraphile/postgresql-schema-design/#row-level-security)
Mixing with [RLS](https://www.postgresql.org/docs/9.6/user-manag.html) and [RBAC](https://www.postgresql.org/docs/9.6/ddl-rowsecurity.html) from [PostgreSQL](https://www.postgresql.org/).

## Requirements

- Node 10.15+
- PostgreSQL 9.6+

## Setup

Create a database named `jwt-graphile-example` in your local environment.

We are using the default user generated by postgres: `postgres` when creating a database to run this example.

If you want to use a specific role and a specific database, please think to:

- update database name that is used in your [config file](/config/default.yml#L5).
- update role name and password that are used to connect to the database in your [config file](/config/default.yml#L7-L8).
- update role name in the [structure file](/db.sql#L80-L94).

_Note: You can always overwrite your config via environmental variables. More in [good-config](https://github.com/dijam/good-config#good-config) documentation._

## Installation

```
npm install
npm run db
```

## Running

```
npm start
```

## Structure

You can check `db.sql` file to know the sql structure.

## Testing authentication

### Required data - JWT

First, visit `http://localhost:3131/login` to get back JWT's associated to the users:

```
// {userId: "JWT"}

{
"1": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9sb2dpbiIsInVzZXJfaWQiOjEsImlhdCI6MTU1MDUwMDgwMH0.wqSPESwLzs671yVKyBD0WK_Ppm8oXJOi06UeA7sn7Oc",
"2": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9sb2dpbiIsInVzZXJfaWQiOjIsImlhdCI6MTU1MDUwMDgwMH0.gGP7YH84vdsLYiwiF7QK3FV63-qs0A63VvPgEfwoDjo",
"admin": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9hZG1pbiIsInVzZXJfaWQiOjAsImlhdCI6MTU1MDUwMDgwMH0.0G1aHgGJcTwCoWCDHBY6pFhZUlb_ML-1t11DZqNTuCM"
}
```

JWT payload contains id and role of the associated user.

### Basic user information request

With the JWT associated to user `1`, we can test if user with id `1` can see all data it is supposed to:

```
curl --request POST \
  --url http://localhost:3131/graphql \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9sb2dpbiIsInVzZXJfaWQiOjEsImlhdCI6MTU1MDUwMDgwMH0.wqSPESwLzs671yVKyBD0WK_Ppm8oXJOi06UeA7sn7Oc' \
  --header 'content-type: application/json' \
  --data '{"query":"{\n  allUsers {\n    nodes {\n      id\n      name\n      familyName\n    }\n  }\n}"}'
```

We are requesting all users but we would get only user `1` information as a result:

```
 {
  "data": {
    "allUsers": {
      "nodes": [
        {
          "id": 1,
          "name": "Majid",
          "familyName": "Garmaroudi"
        }
      ]
    }
  }
}
```

Repeat the same with the token associated to user `2`, you will get only data related to user `2`.

Repeat the same with the token associated to the admin `admin`, you should see as a result:

```
 {
  "data": {
    "allUsers": {
      "nodes": [
        {
          "id": 1,
          "name": "Majid",
          "familyName": "Garmaroudi"
        },
        {
          "id": 2,
          "name": "Paul",
          "familyName": "Rolland"
        }
      ]
    }
  }
}
```

So far, we tested 2 different roles for a same query with 3 different results.

Moreover, we allowed anonymous users to have access to register_user function:

```
curl --request POST \
  --url http://localhost:3131/graphql \
  --header 'content-type: application/json' \
  --data '{"query":"mutation {\n  register(input: {\n    firstName: \"johan\"\n    lastName: \"zoidberg\"\n    email: \"johan@zoidberg.com\"\n    password: \"futurama\"\n  }) {\n    user {\n      id\n      name\n    }\n  }\n}"}'
```

### Advanced user information request

More complex queries can be done in `meme` table where we want users have access to everyones meme but can only update their own.

```
curl --request POST \
  --url http://localhost:3131/graphql \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9sb2dpbiIsInVzZXJfaWQiOjEsImlhdCI6MTU1MDUwNDA3NH0._aM0Z_9F0LXG10yHLThsKtMD0QRPD_VOOH2bbkJep3g' \
  --header 'content-type: application/json' \
  --data '{"query":"{\n  allUserMemes {\n    nodes {\n      id\n      userId\n      memeUrl\n    }\n  }\n}"}'
```

This will return all memes no matter what JWT we use.

```
{
  "data": {
    "allUserMemes": {
      "nodes": [
        {
          "id": 1,
          "userId": 1,
          "memeUrl": "http://meme1"
        },
        {
          "id": 2,
          "userId": 1,
          "memeUrl": "http://meme2"
        },
        {
          "id": 3,
          "userId": 1,
          "memeUrl": "http://meme4"
        },
        {
          "id": 4,
          "userId": 2,
          "memeUrl": "http://meme5"
        },
        {
          "id": 5,
          "userId": 2,
          "memeUrl": "http://meme6"
        }
      ]
    }
  }
}
```

But if we try to update meme number `1` with user id `2` JWT, it would fail:

```
curl --request POST \
  --url http://localhost:3131/graphql \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlcl9sb2dpbiIsInVzZXJfaWQiOjEsImlhdCI6MTU1MDUwNDA3NH0._aM0Z_9F0LXG10yHLThsKtMD0QRPD_VOOH2bbkJep3g' \
  --header 'content-type: application/json' \
  --data '{"query":"mutation {\n  updateUserMemeById(input:{id: 2,userMemePatch: {memeUrl:\"http://newmeme1\"}}) {\n    userMeme {\n      id\n      userId\n      memeUrl\n    }\n  }\n}"}'
```

You will get an error that there is nothing to update:

```
{
  "errors": [
    {
      "extensions": {
        "exception": {}
      },
      "message": "No values were updated in collection 'user_memes' because no values were found.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "updateUserMemeById"
      ],
      "stack": "Error: No values were updated in collection 'user_memes' because no values were found.\n    at commonCodeRenameMe (/private/var/www/vntrs/graphileauth/node_modules/graphile-build-pg/node8plus/plugins/PgMutationUpdateDeletePlugin.js:122:17)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
    }
  ],
  "data": {
    "updateUserMemeById": null
  }
}
```

## Contributors

- [Paul Rolland](https://github.com/PaulRolland68)

## Note

Thanks [Benjie Gillam](https://github.com/benjie) for the guides, clarifications and patiently answering all our questions.