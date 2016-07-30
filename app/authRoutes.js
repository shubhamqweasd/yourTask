var router = require('express').Router();

router.get('/test',function(req,res){
	res.json({"success":true})
})

module.exports = router;