export const validateEmail = new RegExp(/^\S+@\S+\.\S+$/);

export const validatePassword = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
);
