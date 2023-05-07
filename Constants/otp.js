const otpGenerator = require("otp-generator");
//function for generating otp code
module.exports.generateOTP = () => {
  let OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false,
  };

  let OTP_LENGTH = 6;

  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};
