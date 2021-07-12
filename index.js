const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/routes');


app.use(cors());
app.use(todoRoutes);




const PORT = process.env.PORT ?? 3333;

app.listen(PORT, () => {
    console.log(`Server is up ${PORT}`);
});