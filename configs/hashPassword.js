import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const hash = bcrypt.hashSync(password.toString(), 10);
    return hash
}

export const comparePassword = async (password, hash) => {
    const result = bcrypt.compareSync(password.toString(), hash);
    return result
}