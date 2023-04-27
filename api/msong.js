const router = require('express').Router();
const todoController = require('./_controller/msongController');


// select
router.get('/', async (req,res)=>{
    const result = await todoController.list(req);
    res.json(result);
});

module.exports = router;