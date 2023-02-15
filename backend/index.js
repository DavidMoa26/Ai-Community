import express from 'express'
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors'
import db from './database/db.js'
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from './routes/postRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import textRoutes from './routes/textRoutes.js'

// Setting for .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + '/.env' });

// app setting
const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use((express.static(path.join('public'))))

app.use('/api/posts', postRoutes)
app.use('/api/posts', textRoutes)
app.use('/api/ai', aiRoutes)
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/', async (req, res) => {
    res.send("Server up")
})

const startServer = async () => {
    try {
        db();
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server running")
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();