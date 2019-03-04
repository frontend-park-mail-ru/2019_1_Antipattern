const express = require('express');
const PORT = 8080;

const app = express();
app.get('*', express.static('./public/'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
