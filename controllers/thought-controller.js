const res = require('express/lib/response')
const {Thought} = require('../models')

const thoughtController = {
    getAllThought(req,res){
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.thoughtId})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with this ID'})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    addThought({body}, res){
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },
    updateThought(){
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thought found with this ID'})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No thouht found with that ID'})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: "No thought found with this ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },
    deleteReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: body.reactionId}},
            {new:true}

        )
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: "No thought found with this ID"})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))

    }
}