import fs, { write } from "fs";
//@ts-ignore
import csvWriter from "csv-write-stream";
import pump from "pump";
export type CsvAppendOptions = {
  headers?: boolean;
};

export const csvAppend = (path: string, appendToExisting = false) => {
  const writeStream = fs.createWriteStream(path, {
    flags: appendToExisting ? "a" : "w"
  });
  const writer = csvWriter({ sendHeaders: !appendToExisting });
  writer.pipe(writeStream);
  const append = (args: any) => {
    if (Array.isArray(args)) {
      for (let arg of args) {
        writer.write(arg);
      }
    } else {
      writer.write(args);
    }
    return writer;
  };
  const end = () => {
    return new Promise(resolve => {
      pump(writer, writeStream, err => {
        resolve();
      });
      // writer.once("end", resolve);
      writer.end();
    });
  };
  return {
    append,
    end
  };
};
export default csvAppend;
