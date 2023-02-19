import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['keyvalue'] }));

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
})
