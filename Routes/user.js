const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { TOKEN_SEC } = require("../Constants/tokenKey");
// const { encrypt } = require("../Controllers/encrypt");
// const { decrypt } = require("../Controllers/decrypt");
const { User } = require("../Models/users");
const emailvalidator = require("email-validator");
const nodeMail = require("../Constants/nodeMail");
const { generateOTP } = require("../Constants/otp");

router.get("/all", async (req, res) => {
  try {
    let users = await User.find();

    if (!users) {
      return res.send({
        success: false,
        message: "No user Exists",
      });
    } else {
      return res.send({
        success: true,
        message: "user details",
        content: users,
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    //make find()
    let user = await User.findOne({ email: req.body.email });

    // const encryptedPassword = encrypt(req.body.password);

    if (user) {
      return res.send({
        success: false,
        message: "User already Exists",
      });
    } else if (!emailvalidator.validate(req.body.email)) {
      return res.send({
        success: false,
        message: "invalid Email",
      });
    } else {
      user = new User({
        name: req.body.name,
        email: req.body.email,
      });

      await user.save();

      nodeMail();

      return res.send({
        success: true,
        message: "Successfully addedd user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Server error",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.send({
        success: false,
        message: "No user exists to delete",
      });
    } else {
      return res.send({
        success: true,
        message: "Successfully deleted user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Server error",
    });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    let updateUser = await User.findById(req.params.id);

    // const upEncryptedPassword = encrypt(req.body.password);

    if (!updateUser) {
      return res.send({
        success: false,
        message: "No user to update",
      });
    }

    updateUser = updateUser.set({
      name: req.body.name,
      email: req.body.email,
    });

    await updateUser.save();

    return res.send({
      success: true,
      message: "Successfully Updated user",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Unauthorised Access",
    });
  }
});

//db password removed hence it will use passcode OTP
router.post("/login", async (req, res) => {
    //generate otp
    const createOTP = async (email) => {
      const otpGenerated = generateOTP();

      try {
        await sendMail({
          to: email,
          OTP: otpGenerated,
        });
        console.log(otpGenerated);
        return [true, otpGenerated];
      } catch (error) {
        return [false, "Unable to sign up, Please try again later", error];
      }
    };

    //actual login process
    try {
      const { email, otp } = req.body;
      const otpcode = await createOTP(email);

      let loggedUser = await User.findOne({ email: email });

      if (!loggedUser) {
        return res.send({
          success: false,
          message: "No user",
        });
      }

      if (otp != otpcode) {
        res.send({
          message: "invalid OTP code",
        });
      }

      const tokenPayload = {
        userId: loggedUser._id,
        email: loggedUser.email,
        firstName: loggedUser.name,
        // address: loggedUser.address,
      };

      const token1 = jwt.sign(tokenPayload, TOKEN_SEC);

      return res.send({
        success: true,
        message: "Successfully Login user",
        Token: token1,
      });
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Server error",
      });
    }
  }

  // const random = Math.floor(Math.random() * 9000 + 1000);
  // console.log(random);

  // const accessEmail = req.body.email;
  // const accessPassword = req.body.passcode;

  // let loggedUser = await User.findOne({ email: accessEmail });

  // if (!loggedUser) {
  //   return res.send({
  //     success: false,
  //     message: "No user",
  //   });
  // }

  // // const DbPasword = decrypt(loggedUser.password);

  // if (random == accessPassword && loggedUser.email == accessEmail) {
  //   const tokenPayload = {
  //     userId: loggedUser._id,
  //     email: loggedUser.email,
  //     firstName: loggedUser.name,
  //     // address: loggedUser.address,
  //   };

  //   const token1 = jwt.sign(tokenPayload, TOKEN_SEC);

  //   return res.send({
  //     success: true,
  //     message: "Successfully Login user",
  //     Token: token1,
  //   });
  // } else {
  //   return res.send({
  //     success: false,
  //     message: "Password or Email mismatch",
  //   });
  // }
);

module.exports = router;
