const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./Utils/config');
const userRouter = require('./Routes/UserRoute');
const productRoute = require('./Routes/ProductRoute');
const orderRoute = require('./Routes/OrderRoute');
const adminRoute = require('./Routes/AdminRoute');
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRoute);
app.use(orderRoute);
app.use(adminRoute);


// Connected to the server.
app.listen(port, function () {
    console.log("App listening to port 4000")
});