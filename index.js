const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 7000;
const mongoURI = 'mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exam';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quizSchema = new mongoose.Schema({
  name: String,
  sid: String,
}, { collection: 'quizes' }); 

const Quiz = mongoose.model('Quiz', quizSchema);

app.get('/', async (req, res) => {
  try {
    const fullName = 'Leung, Kin Shing';
    const studentID = '300369660';

    const newQuiz = new Quiz({
      name: fullName,
      sid: studentID,
    });

    await newQuiz.save();

    console.log('Quiz document created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating the Quiz document.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
