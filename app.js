const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')


const mongoose = require('mongoose')
const db_name = 'pyctus_db'
const url = `mongodb://dev:dev@cluster0-shard-00-00.nz5xy.mongodb.net:27017,cluster0-shard-00-01.nz5xy.mongodb.net:27017,cluster0-shard-00-02.nz5xy.mongodb.net:27017/${db_name}?ssl=true&replicaSet=atlas-22r9rt-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error));

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const auth = require('./routes/authRoutes')
const user = require('./routes/userRoutes')
const post = require('./routes/postRoutes')
const event = require('./routes/eventRoutes')
const chan = require('./routes/channelRoutes')

app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/posts', post)
app.use('/api/events', event)
app.use('/api/channels', chan)


require('./services/bootService')

app.listen(6969)
