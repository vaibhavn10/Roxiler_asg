const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;
const connectToMongo = require('./db')
connectToMongo()

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/alltransactions'))
  
  app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`)
  })