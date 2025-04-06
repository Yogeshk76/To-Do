import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const userSchema = new mongoose.Schema({
  email : {
    type: String,
    required: true,
    unique: true,
  }, 
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.methods.generateAuthToken = async function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}


export const User = mongoose.model('User', userSchema);


