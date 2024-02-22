//По всем орагнизациям. По всем сотрудникам.
let GetAllEmployees = `
select id as employee_id, full_name from employee  
`;

let GetSelectEmployees = `
select 
    id as employee_id, 

    full_name, 

    birth_date,
    email,
    sex
from 
   employee 
where 
employee.id in (:employee_id)

`;



module.exports = {
    GetAllEmployees,
    GetSelectEmployees,

};
