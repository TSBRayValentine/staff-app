'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dynamics_cache_organizations extends Model {
    static associate(models) {
    }
  };
 

  dynamics_cache_organizations.init({
    category_id	: DataTypes.INTEGER,
    category_name	: DataTypes.TEXT,

    group_id	: DataTypes.INTEGER, 
    group_name	: DataTypes.TEXT,    

    group_category_id	: DataTypes.INTEGER, 
    group_category_name	: DataTypes.TEXT,   

    sex: DataTypes.TEXT,
    total_all: DataTypes.INTEGER,  
    disabled_count: DataTypes.INTEGER,
    age_employee_average: DataTypes.INTEGER,
    age_employee_30_total: DataTypes.INTEGER,
    age_employee_30_40_total: DataTypes.INTEGER,
    age_employee_40_50_total: DataTypes.INTEGER,
    age_employee_50_60_total: DataTypes.INTEGER,
    age_employee_60_total: DataTypes.INTEGER,
   

    stage_common_empty : DataTypes.INTEGER,
    stage_common_1_total : DataTypes.INTEGER,
    stage_common_1_5_total : DataTypes.INTEGER,
    stage_common_5_10_total : DataTypes.INTEGER,
    stage_common_10_15_total : DataTypes.INTEGER,
    stage_common_15_20_total : DataTypes.INTEGER,
    stage_common_20_25_total : DataTypes.INTEGER,
    stage_common_25_total : DataTypes.INTEGER,
    
    stage_state_empty : DataTypes.INTEGER,
    stage_state_1_total : DataTypes.INTEGER,
    stage_state_1_5_total : DataTypes.INTEGER,
    stage_state_5_10_total : DataTypes.INTEGER,
    stage_state_10_15_total : DataTypes.INTEGER,
    stage_state_15_20_total : DataTypes.INTEGER,
    stage_state_20_25_total : DataTypes.INTEGER,
    stage_state_25_total : DataTypes.INTEGER,
    
    stage_gov_empty : DataTypes.INTEGER,
    stage_gov_1_total : DataTypes.INTEGER,
    stage_gov_1_5_total : DataTypes.INTEGER,
    stage_gov_5_10_total : DataTypes.INTEGER,
    stage_gov_10_15_total : DataTypes.INTEGER,
    stage_gov_15_20_total : DataTypes.INTEGER,
    stage_gov_20_25_total : DataTypes.INTEGER,
    stage_gov_25_total : DataTypes.INTEGER,
    
    
    stage_org_empty : DataTypes.INTEGER,
    stage_org_1_total : DataTypes.INTEGER,
    stage_org_1_5_total : DataTypes.INTEGER,
    stage_org_5_10_total : DataTypes.INTEGER,
    stage_org_10_15_total : DataTypes.INTEGER,
    stage_org_15_20_total : DataTypes.INTEGER,
    stage_org_20_25_total : DataTypes.INTEGER,
    stage_org_25_total : DataTypes.INTEGER,

    children_total: DataTypes.INTEGER,
    age_children_1: DataTypes.INTEGER,
    age_children_2: DataTypes.INTEGER,
    age_children_3: DataTypes.INTEGER,
    age_children_4: DataTypes.INTEGER,
    age_children_5: DataTypes.INTEGER,
    age_children_6: DataTypes.INTEGER,
    age_children_7: DataTypes.INTEGER,
    age_children_8: DataTypes.INTEGER,
    age_children_9: DataTypes.INTEGER,
    age_children_10: DataTypes.INTEGER,
    age_children_11: DataTypes.INTEGER,
    age_children_12: DataTypes.INTEGER,
    age_children_13: DataTypes.INTEGER,
    age_children_14: DataTypes.INTEGER,
    age_children_15: DataTypes.INTEGER,
    age_children_16: DataTypes.INTEGER,
    age_children_17: DataTypes.INTEGER,
    age_children_18: DataTypes.INTEGER,
    age_children_more: DataTypes.INTEGER,
    count_with_honors: DataTypes.INTEGER,
    count_candidate: DataTypes.INTEGER,
    count_doctor: DataTypes.INTEGER,
    count_lawyer: DataTypes.INTEGER,
    count_economist: DataTypes.INTEGER,
    count_government: DataTypes.INTEGER,
    count_humunitarian: DataTypes.INTEGER,
    count_other: DataTypes.INTEGER,
    organization_id: DataTypes.INTEGER,
    organization_name: DataTypes.TEXT,
    slice_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'dynamics_cache_organizations',
    paranoid: false,
    freezeTableName: true,
  });
  return dynamics_cache_organizations;
};