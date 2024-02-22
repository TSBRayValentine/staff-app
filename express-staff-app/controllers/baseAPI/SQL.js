//По всем орагнизациям. По всем сотрудникам. 
let GroupCategory = `
SELECT id, name
FROM references_positiongroupcategory
ORDER BY id DESC;
`;




module.exports = {
  GroupCategory, 
};
