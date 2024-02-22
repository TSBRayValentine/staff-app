let Report = `

Select 

    group_category_id as group_category_id, 
    sum(total) as total,
    sum(p1) as p1,
    sum(p2) as p2,
    sum(p3) as p3,
    sum(p4) as p4,
    sum(p5) as p5,
    sum(p6) as p6,
    sum(p61) as p61,
    sum(p7) as p7,
    sum(p8)  as p8
    from mintruds 
    group by group_category_id
    order by group_category_id ASC
`;

//? Здесь находились SQL запросы для сбора исходных данных из главной внешней БД
let ShtatCount = ``;

module.exports = {
  Report,
  ShtatCount,
};
