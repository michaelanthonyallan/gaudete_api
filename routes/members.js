const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Member = require('../models/Member');

// Post a Member

mongoose.set('useFindAndModify', false);

router.post('/', async (req, res) => {
    const member = new Member({
        name: req.body.name,
        age: req.body.age,
        flavorText: req.body.flavorText,
        image: req.body.image
    })

    try {
        const savedMember = await member.save()
        res.json(savedMember);
    } catch (error) {
        res.json({
            message: error
        })
    }
});

// Returns All Posts

router.get('/', async (res, req) => {
    try {
        const members = await Member.find();
        req.json(members);
    } catch (error) {
        res.json({
            message: error
        })
    }
})

// SPECIFIC POST

router.get('/:memberId', async (req, res) => {
    try {
        const member = await Member.findById(req.params.memberId)
        res.json(member);
    } catch (error) {
        res.json({
            message: error
        })
    }
});

// ByName

router.get('/memberByName/:memberName/', async (req, res) => {
    const member = await Member.findOne({
        name: req.params.memberName.toString()
    }, function(err, member) {
        if(err){
            console.log(err)
        } else {
            res.json(member)
        }
    })
})

// UPDATE POST

router.patch('/:memberId', async (req, res) => {
    try {
        const updatedMember = await Member.updateOne({_id: req.params.memberId}, 
            {$set: {flavorText: req.body.flavorText}
        });
        res.json(updatedMember)
    } catch (error) {
        res.json({
            message: error
        })
    }
})



// DELETE POST

router.delete('/:memberId', async (req, res) => {
    try {
        const removedMember = await Member.remove({
            _id: req.params.memberId
        })
        res.json(removedMember)
    } catch (error) {
        res.json({
            message: error
        })
    }
})

module.exports = router;