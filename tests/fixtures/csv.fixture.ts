import {v4 as uuid} from 'uuid'
interface EquipmentReportRow {
  equipment_id: string;
  timestamp: string;
  value: number;
}

export function createCsvBuffer(rows: EquipmentReportRow[]): Buffer {
  const csvData = ['equipment_id,timestamp,value'].concat(
    rows.map((row) => {
      return `${row.equipment_id},${row.timestamp},${row.value}`;
    })
  ).join('\n');

  return Buffer.from(csvData);
}

export const csvData =():EquipmentReportRow[]=> [
  { equipment_id: uuid(), timestamp: '2023-02-12T01:30:00.000-05:00', value: 78.8 },
  { equipment_id: uuid(), timestamp: '2023-01-12T01:30:00.000-05:00', value: 8.8 },
];

