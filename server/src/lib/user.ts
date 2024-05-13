import * as bcrypt from 'bcrypt'

export const comparePassword = async (
  target: string,
  password: string,
): Promise<boolean> => {
  return await bcrypt.compare(target, password)
}
