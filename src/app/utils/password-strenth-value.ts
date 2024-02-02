
export const getPasswordStrengthValue = (password: string): any => {
  if (!password || password.length == 0) { return 0 }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  let strength = 0;

  if (password.length >= minLength) { strength++; }
  if (hasUpperCase) { strength++; }
  if (hasLowerCase) { strength++; }
  if (hasNumber) { strength++; }
  if (hasSpecialCharacter) { strength++; }

  if (strength === 0) {
    return 0;
  }
  if (strength == 1) {
    return 20;
  }
  if (strength == 2) {
    return 40;
  }
  if (strength == 3) {
    return 60;
  }
  if (strength == 4) {
    return 80;
  }
  if (strength == 5) {
    return 100;
  }

}

