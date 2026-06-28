import express from 'express';import mongoose from 'mongoose';import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
// In Phase 1, we connect using the Docker service name "database"const mongoURI = process.env.MONGO_URI || 'mongodb://database:27017/testdb';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));
// Simple Schema to store test messagesconst MessageSchema = new mongoose.Schema({ text: String });const Message = mongoose.model('Message', MessageSchema);
// API Endpoint to fetch data
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});
// API Endpoint to send data
app.post('/api/messages', async (req, res) => {
  const newMessage = new Message({ text: req.body.text });
  await newMessage.save();
  res.status(201).json(newMessage);
});

app.listen(5000, () => console.log('Backend server running on port 5000'));
