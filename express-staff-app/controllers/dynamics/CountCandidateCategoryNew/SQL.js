//По всем орагнизациям. По всем сотрудникам. 
let CountCandidateCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(count_candidate) as count_candidate
FROM
  dynamics_cache_organizations

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountCandidateCategoryNewOrganization =`
SELECT
  slice_date AS label,
   category_name,

	SUM(count_candidate) as count_candidate
FROM
  dynamics_cache_organizations
WHERE	
  organization_id in ( :organization_id)
GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;


`



module.exports = {
  CountCandidateCategoryNew,
  CountCandidateCategoryNewOrganization,
};
