const express = require("express")
const router = express.Router()
// const mongoose = require("mongoose");
const Booking = require("../models/booking")
const Room = require("../models/room")
const User = require("../models/user")
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51K3iObGUuPPCLEZE3LWPdrlPS8NPgPFZi8TRGbn10f5eBExxKXPKRnEHcP45S8lCI7FmkUJFkG64ORwQ9eh6lIgc00lkUAHTGS')

router.post("/bookroom", async (req, res) => {
    const {
        room,
        userid,
        nameuser,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        })
        const payment = await stripe.charges.create(
            {
                amount: totalamount,
                customer: customer.id,
                currency: 'vnd',
                receipt_email: token.email
            }, {
                idempotencyKey: uuidv4()
            }
        );

        if (payment) {
            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                nameuser,
                userid,
                fromdate: moment(fromdate).format('DD-MM-YYYY'),
                todate: moment(todate).format('DD-MM-YYYY'),
                totalamount,
                totaldays,
                transactionId: '1234'
            });

            const booking = await newbooking.save()

            const roomtemp = await Room.findOne({ _id: room._id })

            roomtemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: moment(fromdate).format('DD-MM-YYYY'),
                todate: moment(todate).format('DD-MM-YYYY'),
                userid: userid,
                nameuser: nameuser,
                status: booking.status,
            })
            await roomtemp.save()
        }

        res.send('Thanh toán thành công, Phòng đã được đặt')

    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/getbookingsbyuserid", async(req, res) => {
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/cancelbooking", async(req, res)=>{
    const {bookingid, roomid} = req.body
    try {
        const bookingitem = await Booking.findOne({_id:bookingid})
        bookingitem.status = "Đã huỷ"
        await bookingitem.save()

        const room = await Room.findOne({_id:roomid})
        const bookings = room.currentbookings
        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)

        room.currentbookings = temp

        await room.save()

        res.send('Bạn đã huỷ phòng thành công')
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/getallbookings', async(req, res) => {
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
})
module.exports = router