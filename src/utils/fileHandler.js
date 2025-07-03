import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (name) =>
  path.join(__dirname, "..", "data", `${name}.json`);

//Read Data :
export const readData = async (name) => {
  try {
    const filePath = getFilePath(name);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

//Write Data :
export const writeData = async (name, data) => {
  const filePath = getFilePath(name);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
