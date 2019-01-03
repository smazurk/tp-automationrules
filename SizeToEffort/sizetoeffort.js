const commands = [];
const resourceId = args.ResourceId;
const s = args.Changed.TShirtSize;


var tShirtEffort = 0;

switch (s){
  case "S (2 weeks)":
    tShirtEffort = 80;
    break;
 case "M (4 weeks)":
    tShirtEffort = 160;
    break;
  case "L (8 weeks)":
    tShirtEffort = 320;
    break;
  case "XL (16 weeks)":
    tShirtEffort = 640;
    break;
}

commands.push( 
  {
    command: "targetprocess:UpdateResource",
    payload: {
      resourceType: "Feature",
      resourceId: resourceId,
      fields: {
        Id: resourceId,
        "InitialEstimate":tShirtEffort,
      }
    }
  }
);

return commands;
