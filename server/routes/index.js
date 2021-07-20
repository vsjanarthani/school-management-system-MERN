const router = require('express').Router();
const studentRoutes = require("./student-routes");
// const htmlRoutes = require('./html');


router.use('/students', studentRoutes);
// router.use('/', htmlRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;