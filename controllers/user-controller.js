const {User} = require('../models')

const userController = {
    //find all users
    getAllUser(req,res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                friends: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    getUserById({params}, res){
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

}