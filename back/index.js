import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import areasRouter from './router/areas-router.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8081

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.use('/images', express.static('images'), (req, res) => {
    res.status(404).redirect('/images/no_artist.png');
});

app.use('/api/v0', areasRouter);

const start = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(
            process.env.DB_CONNECT,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => {
                console.log('Connected to DB!')
            },
        )
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()