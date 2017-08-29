const Router = require('express').Router;
const router = Router();
const Image = require('../models/images');

router
  .get('/', (req, res, next) => {
    Image.find()
      .then(images => res.send(images))
      .catch(next);
  })
  
  .post('/', (req, res, next) => {
    new Image(req.body)
      .save()
      .then(image => res.send(image))
      .catch(next);
  })
  
  .delete('/:id', (req, res) => {
    Image.findByIdAndRemove(req.params.id)
      .then(response => res.send({ removed: !!response }));
  });

//TODO: getbyid, delete

module.exports = router;
