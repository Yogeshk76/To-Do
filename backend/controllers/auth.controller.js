import {User} from '../models/user.model.js';


export const registerUser = async (req, res) => {
  try {
    const {email, password} = req.body;


    //checking if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //hashing the password
    const hashedPassword = await User.hashPassword(password);

    //creating the user
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    //generating the token
    const token = await user.generateAuthToken();

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    //checking if the user exists

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //checking if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //generating the token
    const token = await user.generateAuthToken();
    res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}