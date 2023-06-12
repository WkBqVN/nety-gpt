const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, _ => {
    console.log(`Server is running on port ${PORT}`)
});

