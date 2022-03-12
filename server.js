const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MOGODB_URI || 'mongodb://loaclhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('debug', true)

app.use(require('./routes'))

app.listen(PORT, () => console.log(`Connected on locolhost:${PORT}`))