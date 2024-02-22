//По всем орагнизациям. По всем сотрудникам. 
let CountVacanciesCategoryNew = `
SELECT
  slice_date AS label,
   category_name,

	SUM(cnt) as vacancies_count
FROM
  dynamics_vacancies_free

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;
`;

let CountVacanciesCategoryNewOrganization =`
SELECT
  slice_date AS label,
   category_name,

	SUM(cnt) as vacancies_count
FROM
  dynamics_vacancies_free
  WHERE	
  organization_id in( :organization_id)

GROUP BY
  slice_date, category_name
  ORDER BY
   slice_date ASC;

`



module.exports = {
  CountVacanciesCategoryNew,
  CountVacanciesCategoryNewOrganization,
};
