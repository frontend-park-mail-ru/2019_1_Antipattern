const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();
app.get('*', express.static('./public/'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

