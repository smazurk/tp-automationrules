[
  {
    "type": "source:targetprocess:EntityChanged",
    "entityTypes": [
      "UserStory"
    ],
    "modifications": {
      "created": true,
      "deleted": false,
      "updated": false
    }
  },
  {
    "or": [
      {
        "and": [
          {
            "value": {
              "type": "constant",
              "value": "...(Split)"
            },
            "target": {
              "name": "Name",
              "type": "field",
              "target": {
                "type": "pipelineBlockOutput"
              }
            },
            "operator": {
              "type": "contains"
            }
          }
        ]
      }
    ],
    "type": "filter:Relational"
  },
  {
    "type": "action:JavaScript",
    "script": "const api = context.getService(\"targetprocess/api/v2\");\nconst owners = await api.queryAsync(\"Relations\", {\n  select: \"master.owner.id\",\n  where: \"slave.id=\" + args.ResourceId\n});\nif (!owners || !owners[0]) { return; }\n\nreturn {\n  command: \"targetprocess:CreateResource\",\n  payload: {\n    resourceType: \"Assignment\",\n    resourceId: userStoryId,\n    fields: {\n      Assignable: { Id: args.ResourceId },\n      GeneralUser: { Id: owners[0] },\n      Role: { Id: id}\n    }\n  }\n};\n"
  }
]
