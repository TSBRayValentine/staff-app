let fill_salary = [
    {
        "name": "Новые Значения",
        "total_salaries": 300,
        "max_salary": 290,
        "min_salary": 290,
        "count_done": 0.8
    },
    {
        "name": "Инновационные Технологии",
        "total_salaries": 320,
        "max_salary": 320,
        "min_salary": 310,
        "count_done": 0.9
    },
    {
        "name": "Прогрессивные Решения",
        "total_salaries": 400,
        "max_salary": 400,
        "min_salary": 400,
        "count_done": 1
    },
    {
        "name": "Успешные Идеи",
        "total_salaries": 600,
        "max_salary": 350,
        "min_salary": 350,
        "count_done": 0.6
    },
    {
        "name": "Оптимальные Сервисы",
        "total_salaries": 500,
        "max_salary": 490,
        "min_salary": 490,
        "count_done": 0.95
    },
    {
        "name": "Глобальный Прогресс",
        "total_salaries": 450,
        "max_salary": 450,
        "min_salary": 450,
        "count_done": 1
    },
    {
        "name": "Технологический Прорыв",
        "total_salaries": 370,
        "max_salary": 370,
        "min_salary": 370,
        "count_done": 1
    },
    {
        "name": "Логистический Оптимум",
        "total_salaries": 420,
        "max_salary": 420,
        "min_salary": 420,
        "count_done": 1
    },
    {
        "name": "Умный Прогресс",
        "total_salaries": 190,
        "max_salary": 180,
        "min_salary": 180,
        "count_done": 0.85
    },
    {
        "name": "Идеальные Решения",
        "total_salaries": 270,
        "max_salary": 269,
        "min_salary": 269,
        "count_done": 0.99
    }
]


let selary_total = {
    data : [
        {
            "organization_name": "Альфа-Омега",
            "min_salary": 20,
            "max_salary": 50,
            "count_position_min": 40,
            "count_position_max": 50,
            "count_position_other": 110,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 15,
            "all_count": 220,
            "count_position_min_percent": 18.18,
            "count_position_max_percent": 22.73,
            "count_position_other_percent": 50,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 6.82,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Глобальные Технологии",
            "min_salary": 25,
            "max_salary": 60,
            "count_position_min": 50,
            "count_position_max": 60,
            "count_position_other": 130,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 20,
            "all_count": 260,
            "count_position_min_percent": 19.23,
            "count_position_max_percent": 23.08,
            "count_position_other_percent": 50,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 7.69,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Инновационные решения",
            "min_salary": 30,
    "max_salary": 70,
    "count_position_min": 60,
    "count_position_max": 70,
    "count_position_other": 150,
    "count_whitout_minmax": 0,
    "count_whitout_salary_units": 0,
    "count_position_incorrect": 0,
    "count_position_equal": 25,
    "all_count": 300,
    "count_position_min_percent": 20,
    "count_position_max_percent": 23.33,
    "count_position_other_percent": 50,
    "count_whitout_data_percent": 0,
    "count_position_incorrect_percent": 0,
    "count_position_equal_percent": 8.33,
    "count_whitout_data": 0
        },
        {
            "organization_name": "Мегаполис Логистика",
            "min_salary": 30,
            "max_salary": 70,
            "count_position_min": 60,
            "count_position_max": 70,
            "count_position_other": 150,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 25,
            "all_count": 300,
            "count_position_min_percent": 20,
            "count_position_max_percent": 23.33,
            "count_position_other_percent": 50,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 8.33,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Новые Горизонты",
            "min_salary": 35,
    "max_salary": 80,
    "count_position_min": 70,
    "count_position_max": 80,
    "count_position_other": 180,
    "count_whitout_minmax": 0,
    "count_whitout_salary_units": 0,
    "count_position_incorrect": 0,
    "count_position_equal": 30,
    "all_count": 360,
    "count_position_min_percent": 19.44,
    "count_position_max_percent": 22.22,
    "count_position_other_percent": 50,
    "count_whitout_data_percent": 0,
    "count_position_incorrect_percent": 0,
    "count_position_equal_percent": 8.33,
    "count_whitout_data": 0
        },
        {
            "organization_name": "Оптимум Сервис",
            "min_salary": 13,
            "max_salary": 35,
            "count_position_min": 23,
            "count_position_max": 38,
            "count_position_other": 101,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 2,
            "all_count": 164,
            "count_position_min_percent": 14.02,
            "count_position_max_percent": 23.17,
            "count_position_other_percent": 61.59,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 1.22,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Прогрессивные Идеи",
            "min_salary": 35,
            "max_salary": 80,
            "count_position_min": 70,
            "count_position_max": 80,
            "count_position_other": 180,
            "count_whitout_minmax": 10,
            "count_whitout_salary_units": 5,
            "count_position_incorrect": 3,
            "count_position_equal": 30,
            "all_count": 360,
            "count_position_min_percent": 19.44,
            "count_position_max_percent": 22.22,
            "count_position_other_percent": 50,
            "count_whitout_data_percent": 4.17,
            "count_position_incorrect_percent": 0.83,
            "count_position_equal_percent": 8.33,
            "count_whitout_data": 15
        },
        {
            "organization_name": "Созвездие Успеха",
            "min_salary": 35,
            "max_salary": 80,
            "count_position_min": 70,
            "count_position_max": 80,
            "count_position_other": 180,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 30,
            "all_count": 360,
            "count_position_min_percent": 19.44,
            "count_position_max_percent": 22.22,
            "count_position_other_percent": 50,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 8.33,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Технодинамика",
            "min_salary": 40,
            "max_salary": 85,
            "count_position_min": 80,
            "count_position_max": 90,
            "count_position_other": 200,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 40,
            "all_count": 410,
            "count_position_min_percent": 19.51,
            "count_position_max_percent": 21.95,
            "count_position_other_percent": 48.78,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 9.76,
            "count_whitout_data": 0
        },
        {
            "organization_name": "Умные Решения",
            "min_salary": 40,
            "max_salary": 85,
            "count_position_min": 80,
            "count_position_max": 90,
            "count_position_other": 200,
            "count_whitout_minmax": 0,
            "count_whitout_salary_units": 0,
            "count_position_incorrect": 0,
            "count_position_equal": 40,
            "all_count": 410,
            "count_position_min_percent": 19.51,
            "count_position_max_percent": 21.95,
            "count_position_other_percent": 48.78,
            "count_whitout_data_percent": 0,
            "count_position_incorrect_percent": 0,
            "count_position_equal_percent": 9.76,
            "count_whitout_data": 0
        },
      
      
    ],
    total: {
   
    }
}

module.exports = {
    fill_salary,
    selary_total,
  };
  