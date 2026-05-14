import fs from 'fs';
import path from 'path';
import { isObject, isString } from './utils.js';

export const existsPath = (path) => {
    return isString(path, false) && fs.existsSync(path);
};

export const isDirectory = (path) => {
    return existsPath(path) && fs.lstatSync(path).isDirectory();
};

export const createStructure = (base, obj) => {
    if (!isObject(obj)) return;

    for (const key in obj) {
        if (key) {
            let fullPath = path.join(base, key);
            const value = obj[key];

            if (isString(value, false)) {
                if (value !== '.') fullPath = `${fullPath}.${value}`;
                if (!isDirectory(fullPath)) {
                    fs.writeFileSync(fullPath, '');
                }
            } else {
                fs.mkdirSync(fullPath, { recursive: true });
                createStructure(fullPath, value);
            }
        }
    }
};