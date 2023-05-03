const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(bodyparser.json({ limit: "50mb" }));
app.use(
  bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use(express.static("public"));

const config = require("./Constants/config");
const User = require("./Routes/user");
// const Products = require("./routes/product");
// const Orders = require("./routes/order");

app.use("/api/user", User);
// app.use("/api/products", Products);
// app.use("/api/orders", Orders);


(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(config.Db);
        console.log("DB Connected");
    } catch (error) {
        console.log("Error: " + error);
    }
})()



// mongoose.connect(
//     config.Db,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function () {
//       console.log("Db Connected!");
//     }
//   );

  
  app.listen(config.port);