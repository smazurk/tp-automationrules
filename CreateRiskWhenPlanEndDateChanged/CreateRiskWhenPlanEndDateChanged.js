[
  {
    "type": "source:targetprocess:EntityChanged",
    "entityTypes": [
      "Epic"
    ],
    "modifications": {
      "created": false,
      "deleted": false,
      "updated": [
        "PlannedEndDate"
      ]
    }
  },
  {
    "or": [
      {
        "and": [
          {
            "value": {
              "type": "pipelineBlockOutput"
            },
            "target": {
              "name": "PlannedEndDate",
              "type": "field",
              "target": {
                "name": "Previous",
                "type": "field",
                "target": {
                  "type": "pipelineBlockOutput"
                }
              }
            },
            "operator": {
              "type": "exists"
            }
          }
        ]
      }
    ],
    "type": "filter:Relational"
  },
  {
    "type": "action:targetprocess:CreateEntityAndAddRelation",
    "fields": {
      "Name": {
        "type": "constant",
        "value": "Risk - Scope Change"
      },
      "Project": {
        "name": "Project",
        "type": "field",
        "target": {
          "type": "pipelineBlockOutput"
        }
      },
      "Responsible": {
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
    "isInbound": {
      "type": "constant",
      "value": false
    },
    "entityType": {
      "type": "constant",
      "value": "Impediment"
    },
    "relationType": {
      "type": "constant",
      "value": "Dependency"
    }
  }
]
