[
  {
    "type": "source:targetprocess:EntityChanged",
    "entityTypes": [
      "Task"
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
              "value": 0
            },
            "target": {
              "name": "TimeRemain",
              "type": "field",
              "target": {
                "type": "pipelineBlockOutput"
              }
            },
            "operator": {
              "type": ">"
            }
          }
        ]
      }
    ],
    "type": "filter:Relational"
  },
  {
    "type": "action:JavaScript",
    "script": "const api = context.getService(\"targetprocess/api/v2\");\n\nconst entityId = args.ResourceId;\n\nconst projectId = args.Current.Project.Id;\n\nconst userId = args.Author.Id;\n\nconst querySpec = {\n  select: \"{assignmentRoleId: role.id}\",\n  where: `(assignable.id == ${entityId} and generalUser.id == ${userId})`\n};\n\nconst userRoleResponse = await api.queryAsync(\"Assignments\", querySpec);\n\nlet userRoleId;\n\nif (userRoleResponse.length) {\n  userRoleId = userRoleResponse[0].assignmentRoleId;\n}\nelse {\n  userRoleId = args.Author.DefaultRoleId;\n}\n\nreturn {\n  command: \"targetprocess:CreateResource\",\n  payload: {\n    resourceType: \"Time\",\n    fields: { \n      Project: {\n        Id: projectId\n      },\n      Assignable: {\n        Id: entityId\n      },\n      User: {\n        Id: userId\n      },\n      Role: {\n        Id: userRoleId\n      },\n      Spent: args.Current.TimeRemain,\n      Remain: 0,\n      Description: \"TimeRemain submitted when moving entity to final state\"\n        }\n  }\n};\n"
  }
]
