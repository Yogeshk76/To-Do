import mongoose from 'mongoose';


const taskSchema =  new mongoose.Schema ({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true,
})

const Task = mongoose.model('Task', taskSchema);