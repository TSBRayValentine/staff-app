//По всем орагнизациям. По всем сотрудникам. 
let AvargeAgeEmployeesCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	ROUND(AVG( age_employee_average),2) as avager_age
FROM
  dynamics_cache_organizations

GROUP BY
  slice_date, category_name

  ORDER BY
  slice_date ASC;

`;

let AvargeAgeEmployeesCategoryNewOrganization =`
SELECT
  slice_date AS label,
  category_name,

	ROUND(AVG( age_employee_average),2) as avager_age
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
  AvargeAgeEmployeesCategoryNew,
  AvargeAgeEmployeesCategoryNewOrganization,
};
