import fs from 'fs';
import Papa from 'papaparse';

const STORAGE_DIR = "/nirbhay_PV_dir"

export const calculateSum = async (req: any, res: any) => {
  try {
    const { file, product } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file name provided.' });
    }

    const filePath = `${STORAGE_DIR}/${file}`

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on the mounted disk.' });
    }

    const sum = await calculateCSVSum(filePath, product);
    return res.status(200).json({ sum });
  } catch (error) {
    console.error("Error calculating sum in gke-product-calculator:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const calculateCSVSum = (filePath: string, product: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    let sum = 0;

    const fileStream = fs.createReadStream(filePath);
    Papa.parse(fileStream, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {

        result.data.forEach((row: any) => {
          if (row.product == product) {
            sum += parseFloat(row.amount) || 0;
          }
        });
        resolve(sum);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
