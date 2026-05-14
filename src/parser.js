import { isEmpty, isString, startsWithUpperCase } from "./utils.js";
import { EXIT_CODE, exitError } from "./validators/index.js";
import { parserInvalidLine } from "./validators/parserValidator.js";

export const getLevel = (line, spacesPerLevel = 4) => {
    const indent = line.match(/^[\s│├─└]*/)[0];
    const visualLevels = (indent.match(/[│]/g) || []).length;
    const spaces = indent.replace(/\s│/g, '').length;
    const level = visualLevels + Math.floor(spaces / spacesPerLevel);

    return level;
};

const pathExtension = (path) => {
    if (isString(path, false)) {
        if (String(path).startsWith('.') || startsWithUpperCase(path)) return '.';

        const parts = path.split('.');
        const partsLength = parts.length;

        if (partsLength === 2) {
            return parts[partsLength - 1];
        }
    }

    return null;
};

const pathIsDirectory = (path) => {
    return isString(path, false) ? path.endsWith('/') : false;
};

const clearName = (rawName, node, nodeIsString = true) => {
    if (nodeIsString) {
        return String(rawName).startsWith('.') ? rawName : rawName.replace(`.${node}`, '');
    }
    return rawName.replace('/', '');
}
export const parseTree = (text, spacesPerLevel = 4) => {
    const lines = text.split('\n').filter(l => l.trim() !== '');
    const root = {};
    const stack = [{ level: -1, obj: root }];

    for (let [index, line] of lines.entries()) {
        const rawName = line.replace(/^[\s│├─└]*/g, '').trim();

        if (isString(rawName, false)) {
            const node = pathIsDirectory(rawName) ? {} : pathExtension(rawName);

            if (isEmpty(node)) {
                parserInvalidLine(rawName, index);
                return;
            }

            const level = getLevel(line, spacesPerLevel);
            while (stack[stack.length - 1].level >= level) {
                stack.pop();
            }

            const nodeIsString = isString(node);
            const cleanName = clearName(rawName, node, nodeIsString);
            console.log(index, 'rawName: ', rawName, 'node: ', node, 'cleanName: ', cleanName)

            const parent = stack[stack.length - 1].obj;
            parent[cleanName] = node;

            if (!nodeIsString) {
                stack.push({ level, obj: node });
            }
        }
    }

    return root;
};