[
  {
    "type": "source:targetprocess:EntityChanged",
    "entityTypes": [
      "userstory"
    ],
    "modifications": {
      "created": false,
      "deleted": false,
      "updated": [
        "EntityState"
      ]
    }
  },
  {
    "or": [
      {
        "and": [
          {
            "value": {
              "type": "constant",
              "value": true
            },
            "target": {
              "name": "IsFinal",
              "type": "field",
              "target": {
                "name": "EntityState",
                "type": "field",
                "target": {
                  "type": "pipelineBlockOutput"
                }
              }
            },
            "operator": {
              "type": "is"
            }
          },
          {
            "value": {
              "type": "constant",
              "value": false
            },
            "target": {
              "name": "IsFinal",
              "type": "field",
              "target": {
                "name": "EntityState",
                "type": "field",
                "target": {
                  "name": "Feature",
                  "type": "field",
                  "target": {
                    "type": "pipelineBlockOutput"
                  }
                }
              }
            },
            "operator": {
              "type": "is"
            }
          }
        ]
      }
    ],
    "type": "filter:Relational"
  },
  {
    "type": "filter:JavaScript",
    "script": "const api = context.getService(\"targetprocess/api/v2\");\nconst count = await api.queryAsync(\"userstory\", {\n  where: \"entitystate.isfinal == false and feature.id == \" + args.Changed.Feature.Id,\n  result: \"count\"\n});\n\n//the total number of not finished stories\nreturn count === 0;"
  },
  {
    "type": "action:JavaScript",
    "script": "return {\n  command: \"targetprocess:MoveToState\",\n  payload: {\n    resourceType: \"Feature\",\n    resourceId: args.Current.Feature.Id,\n    stateName: \"Under Review\"\n  }\n}"
  }
]
