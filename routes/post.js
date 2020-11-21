const router = require('express').Router();
const verify = require('./verifytoken.js');

router.get('/', verify, (req, res) =>{
    res.json({temperature : {
        title : 'Bengaluru',
        date: Date.now(),
        value : '20.0'
    }})
})
module.exports = router;