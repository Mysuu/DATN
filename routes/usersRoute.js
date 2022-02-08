const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post("/register", async(req, res) => {
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const user = await newuser.save()
        res.send('Đăng ký tài khoản thành công')
    } catch(error){
        return res.status(400).json({error})
    }
})

router.post("/login", async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({
            email: email,
            password: password
        })
        if(user){
            const temp={
                name: user.name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({ message: 'Đăng nhập thất bại'})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.post("/getuserbyid", async (req, res) => {
    const userid = req.body.userid
    try {
        const user = await User.findOne({ _id: userid })
        res.send(user)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.get('/getallusers', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.put("/edituser", async (req, res) => {
    const userid = req.body.data.userid
    try {
        const user = await User.updateOne({ _id: userid }, req.body.data)
        res.send('Sửa thông tin thành công')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/deleteuser", async (req, res) => {
    const userid = req.body
    try {
      await User.deleteOne({ _id: req.body.userid });
  
      res.send("Xoá tài khoản thành công");
    } catch (error) {
      return res.status(400).json(error);
    }
})

module.exports = router