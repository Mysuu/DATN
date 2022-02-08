const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/getroombyid", async (req, res) => {
    const roomid = req.body.roomid
    try {
        const room = await Room.findOne({ _id: roomid })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post("/addroom", async (req, res) => {
    try {
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('Thêm phòng thành công')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.put("/editroom", async (req, res) => {
    const roomid = req.body.data.roomid
    try {
        const room = await Room.updateOne({ _id: roomid },req.body.data)
        res.send('Sửa phòng thành công')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/deleteroom", async (req, res) => {
    const roomid = req.body.roomid
    try {
      await Room.deleteOne({ _id: req.body.roomid });
  
      res.send("Xoá phòng thành công");
    } catch (error) {
      return res.status(400).json(error);
    }
});

module.exports = router