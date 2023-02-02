const PORT = 8000;

// Import database.js from same directory.
const app = require('./app');

app.listen(PORT, () => {
    console.log(`running on port ${PORT}!`)
});