// MOD-001: ENCABEZADO [INICIO]
/*
*****************************************
PROYECTO: Muyu Ventas
ARCHIVO: Univenta.gs
VERSIÓN: 01.02
FECHA: 13/03/2026 12:42 (UTC-5)
*****************************************
*/
// MOD-001: FIN

// MOD-002: CATEGORÍAS [INICIO]
function getCategorias() {
  const ss = obtenerSpreadsheet();
  const sheet = ss.getSheetByName(HOJA_CATEGORIAS);
  const data = sheet.getRange('A2:A').getValues().flat().filter(String);
  return data;
}
// MOD-002: FIN

// MOD-003: MODOS DE PAGO [INICIO]
function getModosPago() {
  const ss = obtenerSpreadsheet();
  const sheet = ss.getSheetByName(HOJA_MEDIOS_PAGO);
  const data = sheet.getRange('A2:A').getValues().flat().filter(String);
  return data;
}
// MOD-003: FIN

// MOD-004: REGISTRAR VENTA [INICIO]
function registrarVenta(data) {
  const ss = obtenerSpreadsheet();
  const sheet = ss.getSheetByName(HOJA_VENTAS);
  
  // Ubicar la fila correcta
  const newRow = encontrarUltimaFila(sheet);
  
  // Fecha Perú
  const fechaPeru = obtenerFechaPeru();
  
  // Registrar datos
  sheet.getRange(newRow, 1).setValue(fechaPeru);
  sheet.getRange(newRow, 2).setValue(data.categoria);
  sheet.getRange(newRow, 3).setValue(data.producto);
  sheet.getRange(newRow, 4).setValue(data.modoPago);
  sheet.getRange(newRow, 5).setValue(Number(data.precio));
  sheet.getRange(newRow, 6).setValue(Number(data.cantidad));
  sheet.getRange(newRow, 7).setFormula(`=E${newRow}*F${newRow}`);

  // Acumulado columna H
  if (newRow === 2) {
    sheet.getRange(newRow, 8).setFormula(`=G${newRow}`);
  } else {
    sheet.getRange(newRow, 8).setFormula(`=H${newRow - 1}+G${newRow}`);
  }

  return "Registro exitoso";
}
// MOD-004: FIN

// MOD-005: CÓDIGO DE CIERRE [INICIO]
Logger.log('✅ Muyu Ventas Univenta.gs v01.02 cargado correctamente');
// MOD-005: FIN

// MOD-099: NOTAS [INICIO]
/*
DESCRIPCIÓN:
Módulo Univenta.gs para registro simple de ventas en Muyu Ventas.

DEPENDENCIAS EXTERNAS:
- Master.gs: obtenerSpreadsheet(), encontrarUltimaFila(), obtenerFechaPeru()
- Spreadsheet: Hojas 'Cat', 'Mpago', 'Ventas'

FLujo DE DATOS:
- MOD-002: Carga categorías desde hoja Cat (A2:A)
- MOD-003: Carga medios pago desde hoja Mpago (A2:A)
- MOD-004: Registra venta en columnas A-H (Fecha, Cat, Prod, Pago, Precio, Cant, Total, Acum)

ADVERTENCIAS:
- MOD-004: Validar data.categoria y data.modoPago existan en listas
- MOD-004: Precio y cantidad convertidos a Number()
- Fórmula total auto-generada en columna G
*/
// MOD-099: FIN