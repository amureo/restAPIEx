const router = require('express').Router();
const todoController = require('./_controller/todoController');

router.post("/", async (req, res) => {
    const result = await todoController.create(req);
    res.json(result);
});
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

// truncate, dummy insert
router.post('/reset', async (req,res)=>{
    const result = await todoController.reset(req);
    res.json(result);
})

module.exports = router;