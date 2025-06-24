import bcrypt from 'bcrypt';

export const hashPassword = async (plain: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(plain, saltRounds);
};

export const comparePasswords = async (plain: string, hash: string) => {
  return await bcrypt.compare(plain, hash);
};
