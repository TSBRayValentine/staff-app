//По всем орагнизациям. По всем сотрудникам. 
let CountDisableCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(disabled_count) as disabled_count
FROM
  dynamics_cache_organizations

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountDisableCategoryNewOrganization =`
SELECT
  slice_date AS label,
   category_name,

	SUM(disabled_count) as disabled_count
FROM
  dynamics_cache_organizations
WHERE	
  organization_id in (:organization_id)
GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`



module.exports = {
  CountDisableCategoryNew,
  CountDisableCategoryNewOrganization,
};
