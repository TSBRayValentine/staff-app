//По всем орагнизациям. По всем сотрудникам. 
let CountWithHonorsCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(count_with_honors) as count_with_honors
FROM
  dynamics_cache_organizations

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountWithHonorsCategoryNewOrganization =`
SELECT
  slice_date AS label,
   category_name,

	SUM(count_with_honors) as count_with_honors
FROM
  dynamics_cache_organizations
WHERE	
  organization_id in( :organization_id)
GROUP BY
  slice_date, category_name

  ORDER BY
   slice_date ASC;

`



module.exports = {
  CountWithHonorsCategoryNew,
  CountWithHonorsCategoryNewOrganization,
};
