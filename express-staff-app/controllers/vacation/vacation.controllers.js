const K = require("../../lib");
const Excel = require("exceljs");
const SQL = require("./SQL.js");
const data = require("./data.js");

const dayjs = require("dayjs");

// ! Для работы данного раздела использвоались данные из внешней БД. 
// ! В данной реализации используются файл с переработанными данными из внешней БД. 

//? Получить данные для главной таблицы
exports.getVacation = async (req, res) => {
  try {
    const result = data.data

    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(
      `${dayjs().format("DD.MM.YYYY - HH:mm:ss")} | Error ---> ${e.toString()}`
    );
  }
};

//? Выгрузка в EXCEL
exports.downloadVacationExcel = async (req, res) => {
  try {
    // Даты
    const dNow = new Date();
    const dNowStr = K.dStr(dNow);
    const day = dNow.getDate();
    const month = K.months[dNow.getMonth()];
    const year = dNow.getFullYear();

    const templateName = "./export/vacation/vacation.xlsx";
    const saveFileName =
      "./export_files/vacation/vacation-" + dNowStr + ".xlsx";



     const result = data.data

    const workbook = new Excel.Workbook();

    await workbook.xlsx.readFile(templateName);

    const sheet_data = workbook.getWorksheet("Главная");

    const borderStyles = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    sheet_data.getCell(`A1`).value = `График отпусков ${result[0].organization_name} на ${day} ${month} ${year}г.`;
    const fileName = `График отпусков ${result[0].organization_name} на ${day} ${month} ${year} .xlsx`;

    result.forEach((item, index) => {
      sheet_data.getCell(`A${index + 4}`).value = item.full_name;
      sheet_data.getCell(`B${index + 4}`).value = item.department_full_path;
      sheet_data.getCell(`C${index + 4}`).value = item.position_name;
      sheet_data.getCell(`D${index + 4}`).value = item.date_start;
      sheet_data.getCell(`E${index + 4}`).value = item.date_end;
      sheet_data.getCell(`F${index + 4}`).value = item.days_position;
      sheet_data.getCell(`G${index + 4}`).value = item.days_experience;
      sheet_data.getCell(`H${index + 4}`).value = item.days_abnormal;
      sheet_data.getCell(`I${index + 4}`).value = item.days_total;
      sheet_data.getCell(`J${index + 4}`).value = item.days_balance;

      sheet_data.getCell(`A${index + 4}`).border = borderStyles;
      sheet_data.getCell(`B${index + 4}`).border = borderStyles;
      sheet_data.getCell(`C${index + 4}`).border = borderStyles;
      sheet_data.getCell(`D${index + 4}`).border = borderStyles;
      sheet_data.getCell(`E${index + 4}`).border = borderStyles;
      sheet_data.getCell(`F${index + 4}`).border = borderStyles;
      sheet_data.getCell(`G${index + 4}`).border = borderStyles;
      sheet_data.getCell(`H${index + 4}`).border = borderStyles;
      sheet_data.getCell(`I${index + 4}`).border = borderStyles;
      sheet_data.getCell(`J${index + 4}`).border = borderStyles;
    });

    await workbook.xlsx.writeFile(saveFileName);
    return res.download(saveFileName, fileName);
  } catch (error) {
    res.send(error);
  }
};
