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
              "type": "not contains"
            }
          }
        ]
      }
    ],
    "type": "filter:Relational"
  },
  {
    "type": "action:targetprocess:CreateEntity",
    "fields": {
      "Role": {
        "type": "constant",
        "value": 1
      },
      "Assignable": {
        "name": "Id",
        "type": "field",
        "target": {
          "type": "pipelineBlockOutput"
        }
      },
      "GeneralUser": {
        "name": "Id",
        "type": "field",
        "target": {
          "name": "Author",
          "type": "field",
          "target": {
            "type": "pipelineBlockOutput"
          }
        }
      }
    },
    "entityType": {
      "type": "constant",
      "value": "Assignment"
    }
  }
]
