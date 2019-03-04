const express = require('express');
<<<<<<< HEAD
const PORT = 8080;
=======

const PORT = 80;
>>>>>>> db3583f250acfea98b366a3af620c12acf9adbfb

const app = express();
app.get('*', express.static('./public/'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
