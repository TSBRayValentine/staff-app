//По всем орагнизациям. По всем сотрудникам. 
let PopulationTest = `
SELECT
  slice_date AS label,
  sex,
  sum(total_all) as "cnt"


FROM
  dynamics_cache_organizations
WHERE
	group_category_id in (:group_category_id)
GROUP BY
  slice_date, sex
  ORDER BY
  EXTRACT(MONTH FROM slice_date) ASC;
`;

let PopulationTestOrganization =`


SELECT
  slice_date AS label,
  sex,
  sum(total_all) as "cnt"


FROM
  dynamics_cache_organizations
WHERE
	group_category_id in (:group_category_id)
  and organization_id in (:organization_id)
GROUP BY
  slice_date, sex

  ORDER BY
   slice_date ASC;
 `



module.exports = {
  PopulationTest,
  PopulationTestOrganization,
};
