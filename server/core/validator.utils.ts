export function isValidEmail(email: string): boolean {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}

export function isPasswordStrong(password: string): boolean {
  const passwordRegex =
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}).{8,}$/;

  return passwordRegex.test(password);
}
