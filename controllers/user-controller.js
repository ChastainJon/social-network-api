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
                res.json(err)
            })
    },
    //find user by id
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
                res.json(err)
            })
    },
    //create user
    createUser({body}, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },
    //update user
    updateUser({params, body}, res){ 
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData =>{
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this ID'})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    //delete user
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err))
    },
    //add friend
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(400).json({message: 'No user found with this ID'})
                }
            })
            .catch(err => res.json(err))
    },
    //remove friend
    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: {friendId: params.friendId}}},
            {new:true}
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.json(err))
    }

}