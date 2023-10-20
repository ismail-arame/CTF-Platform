const app = require("./app");
const dotenv = require("dotenv");

// dot env config
dotenv.config();

//env variables

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is listening at PORT ", PORT);
});
