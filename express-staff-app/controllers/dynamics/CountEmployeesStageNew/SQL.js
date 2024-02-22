//По всем орагнизациям. По всем сотрудникам. 
let CountEmployeesStageNew = `
SELECT
  slice_date AS label,
  sum(stage_org_1_total) as "<1", 
  sum(stage_org_1_5_total) as "1-5", 
  sum(stage_org_5_10_total) as "5-10", 
  sum(stage_org_10_15_total) as "10-15", 
  sum(stage_org_15_20_total) as "15-20",
  sum(stage_org_20_25_total) as "20-25",
	sum(stage_org_25_total) as ">25",
  sum(stage_org_empty) as "Отсутсвует"
FROM
  dynamics_cache_organizations
WHERE
	group_id not in (9,12)
GROUP BY
  slice_date

  ORDER BY
   slice_date ASC;
`;

let CountEmployeesStageNewOrganization =`

SELECT
  slice_date AS label,
  sum(stage_org_1_total) as "<1", 
  sum(stage_org_1_5_total) as "1-5", 
  sum(stage_org_5_10_total) as "5-10", 
  sum(stage_org_10_15_total) as "10-15", 
  sum(stage_org_15_20_total) as "15-20",
  sum(stage_org_20_25_total) as "20-25",
	sum(stage_org_25_total) as ">25",
  sum(stage_org_empty) as "Отсутсвует"
FROM
  dynamics_cache_organizations
WHERE
	group_id not in (9,12)
  and organization_id in( :organization_id)

GROUP BY
  slice_date

  ORDER BY
   slice_date ASC;

`



module.exports = {
  CountEmployeesStageNew,
  CountEmployeesStageNewOrganization,
};
