var nodemailer = require("nodemailer");

// exports.send = function email(emailSendTo, data) {
//     var transport = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 456,
//         auth: {
//           user: process.env.MyEmail,
//           pass: process.env.PasswordEmail
//         }
//       });

//       const random = Math.floor(Math.random() * 9000 + 1000);

//       var mailOptions = {
//         from: '"Example Team" <from@example.com>',
//         to: 'user1@example.com, user2@example.com',
//         subject: 'Nice Nodemailer test',
//         text: 'Hey there, ${random} it’s our first message sent with Nodemailer ',
//         html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />${random}/>',
//         // attachments: [
//         //   {
//         //     filename: 'mailtrap.png',
//         //     path: __dirname + '/mailtrap.png',
//         //     cid: 'uniq-mailtrap.png' 
//         //   }
//         // ]
//       };
      
//       transport.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//       });
// }


// module. exports =  function(){

    
    
//     async function main() {
        

//         // Generate test SMTP service account from ethereal.email
//         // Only needed if you don't have a real mail account for testing
//         let testAccount = await nodemailer.createTestAccount();
        
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 type: "login",
//                 user: process.env.MyEmail, // generated ethereal user
//                 pass: process.env.PasswordEmail, // generated ethereal password
//             },
//         });
        
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: '"Fred Foo 👻" <foo@example.com>', // sender address
//             to: "husmitha.silva0@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world? <h3><%= random %> </h3></b>", // html body
//         });
        
//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//       }

//       main()
// }()














const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  };
    
  const transporter = nodemailer.createTransport(MAIL_SETTINGS);
  
  module.exports.sendMail = async (params) => {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to, 
        subject: 'Hello ✔',
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
     </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };