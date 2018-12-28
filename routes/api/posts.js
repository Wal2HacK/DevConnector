let express = require('express')
let router = express.Router()

router.get('/test',(req,res) => res.json({Msg:"POST Okay"}))

module.exports = router