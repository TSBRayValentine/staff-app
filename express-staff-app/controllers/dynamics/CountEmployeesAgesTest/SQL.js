//По всем орагнизациям. По всем сотрудникам. 
let CountEmployeesAgesTest = `
SELECT
  slice_date AS label,
  sum(age_employee_30_total) as "30", 
  sum(age_employee_30_40_total) as "30-40", 
  sum(age_employee_40_50_total) as "40-50", 
  sum(age_employee_50_60_total) as "50-60", 
  sum(age_employee_60_total) as "60"
  
FROM
  dynamics_cache_organizations
WHERE
  group_category_id in (:group_category_id)

GROUP BY
  slice_date
  ORDER BY
   slice_date ASC;
`;

let CountEmployeesAgesTestOrganization =`

SELECT
  slice_date AS label,
  sum(age_employee_30_total) as "30", 
  sum(age_employee_30_40_total) as "30-40", 
  sum(age_employee_40_50_total) as "40-50", 
  sum(age_employee_50_60_total) as "50-60", 
  sum(age_employee_60_total) as "60"
  
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
  CountEmployeesAgesTest,
  CountEmployeesAgesTestOrganization,
};
