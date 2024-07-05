import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

export const comparePassword = async(plainPassword, hashedPassword)=>{
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatch;
}

