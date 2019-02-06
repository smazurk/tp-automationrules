[
  {
    "type": "source:schedule",
    "schedule": {
      "kind": "interval",
      "unit": "day",
      "value": 1
    }
  },
  {
    "type": "action:JavaScript",
    "script": "const api = context.getService(\"targetprocess/api/v2\");\nconst now = new Date();\nconst items = await api.queryAsync(\"Assignable\", {\n  where: \"EntityState.IsInitial=true and \" +\n    \"PlannedStartDate > DateTime.Now.AddDays(-1) and PlannedStartDate <= DateTime.Now\",\n  select: \"{id,type:EntityType.Name}\"\n});\n\nreturn items.map(item => {\n  return {\n    command: \"targetprocess:MoveToState\",\n    payload: {\n      resourceId: item.id,\n      resourceType: item.type,\n      stateKind: \"Planned\"\n    }\n  }\n});"
  }
]
