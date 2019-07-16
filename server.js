const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://todos:huydn1@cluster0-9kgko.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("MongoDB database connects successfully");
});

// mongodb://localhost:27017/todos

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('mern-todo-app/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'mern-todo-app', 'build', 'index.html'));
  })
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);


app.listen(PORT, () => {
  console.log("Server is running on PORT : " + PORT);
})