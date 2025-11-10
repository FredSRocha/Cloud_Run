
import { BpmData } from '../types';

export const parseBpmCsv = (file: File): Promise<BpmData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) {
        return reject(new Error('File is empty.'));
      }
      
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length < 2) {
        return reject(new Error('CSV must have a header and at least one data row.'));
      }

      const header = lines[0].split(',').map(h => h.trim().toUpperCase());
      const bpmIndex = header.indexOf('BPM');

      if (bpmIndex === -1) {
        return reject(new Error('CSV must contain a "BPM" column.'));
      }

      const bpmData: BpmData = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length > bpmIndex) {
          const bpmString = values[bpmIndex].trim();
          const bpmValue = parseFloat(bpmString);
          if (!isNaN(bpmValue)) {
            bpmData.push(bpmValue);
          }
        }
      }

      if (bpmData.length === 0) {
        return reject(new Error('No valid BPM data found in the file.'));
      }
      
      resolve(bpmData);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsText(file);
  });
};
