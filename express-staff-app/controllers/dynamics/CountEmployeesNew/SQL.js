//По всем орагнизациям. По всем сотрудникам. 
let CountEmployeesNew = `
SELECT
  slice_date AS label,
  category_name,
  SUM(total_all) AS data
FROM
  dynamics_cache_organizations
GROUP BY
  slice_date, category_name
ORDER BY
   slice_date ASC;

`;

let CountEmployeesNewOrganization =`
SELECT
  slice_date AS label,
  category_name,
  SUM(total_all) AS data
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
  CountEmployeesNew,
  CountEmployeesNewOrganization,
};
