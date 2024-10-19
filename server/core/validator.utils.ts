/**
 *
 * Check if email is valid.
 *
 * @param email
 * @returns true | false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}

/**
 *
 * Check if password is strong enough. Passowrd is considered as strong when contains at least:
 *
 * One digit.
 *
 * One uppercase letter.
 *
 * One lowercase letter.
 *
 * One special character("!@#$%^&*()\-_+.").
 *
 * @returns true | false
 *
 */
export function isPasswordStrong(password: string): boolean {
  const passwordRegex =
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.]){1,}).{8,}$/;

  return passwordRegex.test(password);
}
