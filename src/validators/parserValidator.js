import { isEmpty, isNumber } from "../utils.js";
import { EXIT_CODE, exitError } from "./index.js";

export const parserInvalidLine = (line, index) => {
    if (isEmpty(line)) line = 'UNKNOWN';
    if (!isNumber(index)) index = 'UNKNOWN';

    exitError(`Linha: "${line}" Posição: "${index}". Necessário definir extensão do arquivo ou terminar com "/" para ser diretório.`, EXIT_CODE.INVALID_ARGUMENT);
}