export const REGEX = {
    USERNAME: /^\w{5,20}$/,
    PASSWORD: /^\w{10,}$/,
    NAME: /^.+$/,
    AGE: /^\d+$/,
    ADDRESS: /^.+$/,
    EMAIL: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    VERIFICATION_CODE: /^[A-z0-9]+$/,
};

export const REGEX_TEXT = {
    EMAIL: '包含@字符的字母数字下划线的组合',
    PASSWORD: '10位以上的字母、数字或下划线',
};