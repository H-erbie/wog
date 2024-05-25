export const  generateRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export const ids = () => {
    const crypto = require('crypto')
    const randomBytes = crypto.randomBytes(10);
    const verificationToken = randomBytes.toString('base64');
    const trimmedToken = verificationToken.replace(/[^a-zA-Z0-9]/g, '');
      // if (trimmedToken <= 10) {
      //   return trimmedToken;
      // }
      // const truncatedToken = trimmedToken.substring(0, 10);
      return trimmedToken;
  }