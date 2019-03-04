const express = require('express');
const PORT = 80;

const app = express();
app.get('*', express.static('./public/'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
