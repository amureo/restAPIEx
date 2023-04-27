const router = require('express').Router();
const todoController = require('./_controller/msongController');

// insert
router.post("/", async (req, res) => {
    const result = await todoController.create(req);
    res.json(result);
});
// select
router.get('/', async (req,res)=>{
    const result = await todoController.list(req);
    res.json(result);
});
// update
router.put('/:id', async (req,res)=>{
    const result = await todoController.update(req);
    res.json(result);
});
// delete
router.delete('/:id', async (req,res)=>{
    const result = await todoController.delete(req);
    res.json(result);
});

module.exports = router;