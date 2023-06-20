import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
}
