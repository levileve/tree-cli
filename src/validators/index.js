import { isNumber, isString, valueOrFallback } from "../utils.js";

export const showValidatorMessage = (message = '', success = true) => {
    if (isString(message, false)) {
        if (success) {
            console.log(message, '\n');
        } else {
            console.error('[Error]', message, '\n');
        }
    }
};

export const EXIT_CODE = Object.freeze({
    SUCCESS: 0,
    ERROR: 1,
    INVALID_ARGUMENT: 9,
});

export const exitSuccess = (message = '') => {
    showValidatorMessage(message, true);
    process.exit(EXIT_CODE.SUCCESS);
};

const GENERIC_EXIT_CODE_ERROR = EXIT_CODE.ERROR;
export const exitError = (message = '', code = GENERIC_EXIT_CODE_ERROR) => {
    if (isNumber(message)) {
        code = message;
    } else {
        showValidatorMessage(message, false);
    };

    process.exit(valueOrFallback(code, GENERIC_EXIT_CODE_ERROR, isNumber));
};