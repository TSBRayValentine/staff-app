//По всем орагнизациям. По всем сотрудникам. 
let CountTurnoverCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(cnt) as turnover_count
FROM
  dynamics_staff_turnover

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountTurnoverCategoryNewOrganization =`

SELECT
  slice_date AS label,
   category_name,

	SUM(cnt) as turnover_count
FROM
  dynamics_staff_turnover
  
WHERE	
  organization_id in (:organization_id)

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`

module.exports = {
  CountTurnoverCategoryNew,
  CountTurnoverCategoryNewOrganization,
};
