export const isEmpty = (value) => {
    return value === null || value === undefined || isEmptyString(value);
};

export const isNumber = (value) => {
    return typeof value === "number" && !Number.isNaN(value);
};

export const isString = (value, canEmpty = true) => {
    return (typeof value === "string" && (canEmpty || value.trim().length > 0));
};

export const isEmptyString = (value, isValid = false) => {
    return (isValid || typeof value === "string") && value.trim().length <= 0;
};

export const isBoolean = (value) => {
    return !!(typeof value === "boolean");
};

export const isFunction = (value, callback) => {
    const isValid = !!(typeof value === "function");
    return !!(typeof callback === "function") ? callback(isValid, value) : isValid;
};

export const isObject = (object, canEmpty = false) => {
    const isValid =
        !!(object &&
            typeof Object(object).valueOf() === "object" &&
            !Array.isArray(object) &&
            Object.getPrototypeOf(object) !== RegExp.prototype);

    return isValid && (canEmpty || Reflect.ownKeys(object).length > 0) ? object : false;
};

export const isArray = (array, canEmpty = false) => {
    const isValid = !!(array && Array.isArray(array));

    return isValid && (canEmpty || array.length > 0) ? array : false;
};

export const valueOrFallback = (value, fallback, validator = true) => {
    const isValid = isBoolean(validator) ? validator : isFunction(validator) ? validator(value) : !isEmpty(value);
    return isValid ? value : fallback;
}

const normalizeExtension = (extension) => isString(extension, false) ? extension.replace('.', '') : '';
export const changePathExtension = (path, extension) => {
    if (!isString(path, false)) path = '';

    const normalizedExt = normalizeExtension(extension);

    const [basePath, query] = path.split('?');
    const hasExtension = /\.[^/.]+$/.test(basePath);

    let newPath;

    if (hasExtension) {
        newPath = basePath.replace(/\.[^/.]+$/, `.${normalizedExt}`);
    } else {
        newPath = `${basePath}.${normalizedExt}`;
    }

    return query ? `${newPath}?${query}` : newPath;
};

export const pathExtensionEqual = (path, extensionsValid = []) => {
    let result = false;

    if (!isArray(extensionsValid, true)) {
        extensionsValid = isString(extensionsValid, false) ? [extensionsValid] : [];
    }

    if (!extensionsValid.length || !isString(path, false)) {
        return result;
    }

    const parts = path.split('.');
    const partsLength = parts.length;
    const extension = partsLength ? String(parts[parts.length - 1]).trim() : null;

    if (isString(extension, false)) {
        extensionsValid.some(valid => {
            valid = normalizeExtension(valid);
            const isEqual = valid === extension;

            if (isEqual) result = valid;

            return isEqual;
        });
    }

    return result;
};

export const startsWithUpperCase = (text = '', isValid = false) => {
    return (isValid || isString(text, false)) && text[0] === text[0].toUpperCase();
}

export const startsWithLowerCase = (text = '', isValid = false) => {
    return (isValid || isString(text, false)) && text[0] === text[0].toLowerCase();
}