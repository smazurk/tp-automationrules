const api = context.getService('targetprocess/api/v2');
const teamsApiResponse = await api.queryAsync(args.ResourceType, {
    select: 'assignedteams.select(team.id)',
    where: `id=${args.ResourceId}`,
});
const teamsApiIds = teamsApiResponse.length ? teamsApiResponse[0] : [];
const teamIds = [229, 230, 243].filter(id => !teamsApiIds.includes(id));

return teamIds.map(teamId => {
    return {
        command: 'targetprocess:CreateResource',
        payload: {
            resourceType: 'TeamAssignment',
            fields: {
                Team: {Id: teamId},
                Assignable: {Id: args.ResourceId}
            }
        }
    }
});
