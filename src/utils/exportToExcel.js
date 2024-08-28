/* eslint-disable */
import * as XLSX from "xlsx";

export function exportDataToExcel(fileName, mainData, additionalSheets = {}) {
  const workbook = XLSX.utils.book_new();

  // Crear la hoja principal con los datos y añadirla como tabla
  const mainSheet = XLSX.utils.json_to_sheet(mainData);
  XLSX.utils.book_append_sheet(workbook, mainSheet, "Batch Data");
  applyTableStyle(mainSheet, "A1", mainData.length);

  // Añadir hojas adicionales si están definidas y aplicarles el estilo de tabla
  for (const [sheetName, sheetData] of Object.entries(additionalSheets)) {
    const additionalSheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, additionalSheet, sheetName);
    applyTableStyle(additionalSheet, "A1", sheetData.length);
  }

  // Escribir el archivo a Excel
  XLSX.writeFile(workbook, fileName);
}

function applyTableStyle(worksheet, startCell, dataLength) {
  // Obtener el rango de celdas de la tabla
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const endCell = XLSX.utils.encode_cell({ r: range.e.r, c: range.e.c });

  // Definir el rango completo desde la celda de inicio hasta la celda final
  const tableRange = `${startCell}:${endCell}`;

  // Crear y aplicar el estilo de tabla
  worksheet["!autofilter"] = { ref: tableRange };
  worksheet["!table"] = [
    {
      name: "Table1",
      ref: tableRange,
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium9",
        showRowStripes: true,
      },
      columns: new Array(range.e.c + 1).fill({ name: "", totalsRowLabel: "" }),
    },
  ];
}

export function formatExcelDate(date) {
  return new Date(date).toLocaleString(); // Ejemplo de formateo
}
