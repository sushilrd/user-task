const express = require('express');
const router = express.Router();
const User = require('../controllers/users/user');

router.use(async (req, res, next) => {
    let host = req.hostname;
    if (host === 'http://localhost:4200' || host === 'localhost') {
        next();
    } else {
        throw new Error("failed");
    }
});



router.get('/all', async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.getUsers();
      res.send({ data: response, success: true });
    } catch (error) {
      res.status(error.statusCode || 500).send({ success: false, message: error});
    }
});

router.get('/:id', async (req, res) => {
    try {
      const user = new User(req.body, req.params);
      const response = await user.getUser();
       res.send({ data: response, success: true });
    } catch (error) {
      res.status(error.statusCode || 500).send({ success: false, message: error});
    }
});

router.post('/create', async (req, res) => {
    try {
      const user = new User(req.body);
      const response = await user.createUser();
       res.send({ data: response, success: true });
    } catch (error) {
      res.status(error.statusCode || 500).send({ success: false, message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
      const user = new User(req.body,req.params);
      const response = await user.updateUser();
       res.send({ data: response, success: true });
    } catch (error) {
      res.status(error.statusCode || 500).send({ success: false, message: error});
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try {
      const user = new User(req.body, req.params);
      const response = await user.deleteUser();
       res.send({ data: response, success: true });
    } catch (error) {
      res.status(error.statusCode || 500).send({ success: false, message: error});
    }
});



module.exports = router;
