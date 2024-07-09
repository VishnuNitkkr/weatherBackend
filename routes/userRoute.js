import express from 'express'
import User from '../model/userSchema.js';
import bcryptjs from 'bcryptjs'

const router = express.Router()

//user registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, city } = req.body;

        if(!name||!email||!password||!city){
            return res.status(400).json({
              success:false,
              message:"Please provide all Fields"
            })
          }

          const response = await User.findOne({ email })
          
          
          if (response) {
              return res.status(409).json({
                  success: false,
                  message: "User already exists."
              });
          }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const result = await User.create({ name, email, password: hashedPassword, city });

        console.log(result)

        if (result) {
            return res.status(201).json({
                success: true,
                message: "Registered successfully",
                result
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: 'Registration failed',
            error
        });
    }
})

//user login
router.post('/login', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if(!email||!password||!confirmPassword){
            return res.status(400).json({
              success:false,
              message:"Please provide all Fields"
            })
          }
        if (password === confirmPassword) {
            const user=await User.findOne({email}).select("+password");
        
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid user details"
                });
            }

            const isMatched=await user.comparePassword(password);

            if(!isMatched){
                return res.status(404).json({
                    success: false,
                    message: "Invalid user details"
                }); 
            }

            return res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                user
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Password or Email is incorrect"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: "Error while logging"
        });
    }
})

//fetching user data
router.get('/userData', async (req, res) => {
    try {
        const email = req.query.email;
        const result = await User.findOne({ email })

        return res.status(200).json({
            success: true,
            result
        });
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            
            error
        });
    }
})

export default router;
