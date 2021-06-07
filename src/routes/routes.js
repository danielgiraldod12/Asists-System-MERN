const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Asist = require('../models/Asist');

//User routes
router.get('/users', async(req,res) => {
    const users = await User.find()
    console.log(users)
    res.json(users)
})

router.get('/users/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user);
})

router.post('/users/', async(req,res) => {
    const { name, email} = req.body;
    const newUser = new User({
        name,email
    })
    await newUser.save();
    res.json({status: 'user saved!'});
})

router.put('/users/:id', async(req,res) => {
    const {name, email} = req.body;
    const editUser = {name, email};
    await User.findByIdAndUpdate(req.params.id, editUser);
    res.json({status:'user edited!'})
})

router.delete('/users/:id', async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({status:'deleted!'})
})

//Asist routes
router.get('/asists/', async(req,res) => {
    const asists = await Asist.find();
    res.json(asists);
})

router.get('/asists/:id', async(req,res) => {
    const asist = await Asist.findById(req.params.id)
    res.json(asist);
})

router.post('/asists/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    const {_id, email } = user;
    const id_user = _id
    const newAsist = new Asist({
        id_user,email
    })
    await newAsist.save();
    res.json('asist saved!')
})

router.delete('/asists/:id', async(req,res) => {
    await Asist.findByIdAndDelete(req.params.id);
    res.json('deleted!');
})
module.exports = router;