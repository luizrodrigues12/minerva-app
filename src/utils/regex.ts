export const validateEmail = new RegExp(/^\S+@\S+\.\S+$/);

export const validatePassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
);

export const validateUsername = new RegExp(/^[A-Za-z][A-Za-z0-9_]{1,20}$/);
