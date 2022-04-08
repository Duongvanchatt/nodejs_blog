import User from '../models/users';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email }).exec();
        if (existUser) {
            res.json({
                massage: "email đã tồn tại"
            })
        }
        console.log(req.body);
        const user = await new User({ username, email, password }).save();
       
        res.json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(400).json({
            message: "không tạo được tk"
        })
    }
}
export const signin = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if(!user){
       return res.status(401).json({
            message: "User khong ton tai"
        })
    }
    if(!user.authenticate(password)){
        return res.status(401).json({
            message: "Mat khau khong dung"
        })
    }
    const token = jwt.sign({_id: user._id}, "123456", { expiresIn: 60 * 60 });
    return res.json({
        token,
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        }
    })
}