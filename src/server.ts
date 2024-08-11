import express from 'express';
import checkExistsUserAccount from './middleware/checkExistsUserAccount';
import routeTechnologie from './routes/routeTechnologies'
import routeUser from './routes/routeUser';

const app = express()
app.use(express.json())
app.use(routeTechnologie)
app.use(routeUser)

app.listen(3333, () => {
    console.table({
        status: "working",
        url: "http://localhost:3333"
    })
})