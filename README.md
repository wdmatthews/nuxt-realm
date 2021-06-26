# nuxt-realm
An unofficial MongoDB Realm plugin for NuxtJS.

## Realm Document Rules
### users collection
```
{
  "roles": [
    {
      "name": "owner",
      "apply_when": {
        "userId": "%%user.id"
      },
      "insert": true,
      "delete": true,
      "search": true,
      "read": true,
      "write": true,
      "fields": {
        "name": {}
      },
      "additional_fields": {}
    },
    {
      "name": "non-owner",
      "apply_when": {},
      "insert": false,
      "delete": false,
      "search": true,
      "write": false,
      "fields": {
        "name": {
          "read": true
        }
      },
      "additional_fields": {}
    }
  ],
  "filters": [],
  "schema": {
    "bsonType": "object",
    "title": "User",
    "required": [
      "_id",
      "userId",
      "name"
    ],
    "properties": {
      "_id": {
        "bsonType": "objectId"
      },
      "userId": {
        "bsonType": "string"
      },
      "name": {
        "bsonType": "string",
        "maxLength": 100
      }
    },
    "additionalProperties": false
  }
}
```
