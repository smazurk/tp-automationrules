[
  {
    "type": "source:targetprocess:EntityChanged",
    "entityTypes": [
      "Assignment"
    ],
    "modifications": {
      "created": true,
      "deleted": false,
      "updated": false
    }
  },
  {
    "type": "filter:JavaScript",
    "script": "const api = context.getService(\"targetprocess/api/v2\");\nconst response = await api.queryAsync(\"Assignments\", {\n    result: \"count\",\n    where: \"assignable.id=\" + args.Current.Assignable.Id\n});\n\nreturn response > 1;\n"
  },
  {
    "type": "action:JavaScript",
    "script": "return {\n  command: \"targetprocess:DeleteResource\",\n  payload: {\n    resourceType: \"Assignment\",\n    resourceId: args.ResourceId\n  }\n};\n"
  }
]
