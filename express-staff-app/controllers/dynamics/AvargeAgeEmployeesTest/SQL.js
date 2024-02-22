//По всем орагнизациям. По всем сотрудникам. 
let AvargeAgeEmployeesTest = `
SELECT
  slice_date AS label,
	ROUND(AVG( age_employee_average),2) as avager_age
FROM
  dynamics_cache_organizations
WHERE

  group_category_id in (:group_category_id)
GROUP BY
  slice_date
  ORDER BY
   slice_date ASC;

`;

let AvargeAgeEmployeesTestOrganization =`
SELECT
  slice_date AS label,
	ROUND(AVG( age_employee_average),2) as avager_age
FROM
  dynamics_cache_organizations
WHERE
  group_category_id in (:group_category_id)
  and organization_id in( :organization_id)
GROUP BY
  slice_date
  ORDER BY
   slice_date ASC;
`



module.exports = {
  AvargeAgeEmployeesTest,
  AvargeAgeEmployeesTestOrganization,
};
