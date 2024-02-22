//По всем орагнизациям. По всем сотрудникам. 
let CountDoctorCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(count_doctor) as count_doctor
FROM
  dynamics_cache_organizations

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountDoctorCategoryNewOrganization =`
SELECT
  slice_date AS label,
   category_name,

	SUM(count_doctor) as count_doctor
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
  CountDoctorCategoryNew,
  CountDoctorCategoryNewOrganization,
};
