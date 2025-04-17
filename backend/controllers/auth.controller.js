import {User} from '../models/user.model.js';


const registerUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const existingUser = await User.findOne({email});

    if(existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const user = await User.create({
      email,
      password,
    });


    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }
  catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

  const isMatch = await user.comparePassword(password);
  if(!isMatch) {
    return res.status(400).json({
      message: 'Invalid credentials',
    });
  }
  const token = user.generateAuthToken();

  res.setHeader('Authorization', `Bearer ${token}`);

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      id: user._id,
      email: user.email,
    }
  });
  }
  catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
}

const logoutUser = async (req, res) => {
  res.send(200).json({message : 'User logged out successfully'});
}

export {
  registerUser,
  loginUser,
  logoutUser,
}