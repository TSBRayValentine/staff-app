let phonebook_data = `
select 
employee.id, employee.full_name, employee.phone_work, organizations.name as organization_name
from 
	employee  

left join organizations on (organizations.id = employee.organization_id)

`;
let employee_info = `
select 

	employee.*, organizations.name as organization_name
from 
	employee  
left join organizations on (organizations.id = employee.organization_id)
    
where 
	employee.id = :id  
`;
module.exports = {
  phonebook_data,
  employee_info,
};
