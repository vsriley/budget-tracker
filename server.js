
const app = () => {
  import homeRoute from "./routes/index";

  const express = require("express");
  const logger = require("morgan");
  const mongoose = require("mongoose");
  const compression = require("compression");
  require("dotenv").config();
  
  const PORT = 3000 || process.env.PORT;
  
  const app = express();
  
  app.use(logger("dev"));
  
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(express.static("public"));
  
  // mongoose setup 
  mongoose.connect(process.env.MONGODB_URI|| "mongodb://localhost/budget",{
    useNewUrlParser: true,
    useFindAndModify: false
  }); 
  mongoose.Promise = global.Promise;
  
  // routes
  homeRoute(app);
  app.use(require("./routes/api.js"));
  
  // set up a wildcard route to catch related endpoints and outputs a response.
  app.get('*', (req, res) => {
    res.status(400).json({
      message: 'This is Project Support. Please see documentation for the proper routes.',
    });
  });
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
}


export default app;