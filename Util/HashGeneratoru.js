import bcrypt from 'bcrypt'

export const generateHash = async (password) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash
    } catch (error) {
      console.error('Error generating hash:', error);
    }
  };


 export const comparing = async (password,hashPassword)=>{
    try {
      const result = await bcrypt.compare(password, hashPassword);
      return result
    } catch (error) {
      console.error('Error comparing password:', error);
    }
  }






