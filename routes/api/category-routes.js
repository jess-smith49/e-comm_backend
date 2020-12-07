const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      Product
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
  })
});




router.get('/:id', (req, res) => {
  // be sure to include its associated Products
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
    .then(dbCategoryData => {
      if(!dbCategoryData){
        res.status(400).json({message: 'No category found with this ID'})
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })
});





router.post('/', (req, res) => {
  // create a new category
  Category.create({
    //expects category name
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});



router.put('/:id', (req, res) => {
  Category.update(
    {
      // update a category by its `id` value
      where: {
          id: req.params.id
      }
    })
    .then (dbCategoryData => {
      if(!dbCategoryData){
        res.status(404).json({message: 'No category found with this ID'})
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});





router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then (dbCategoryData=>{
    if(!dbCategoryData){
      res.status(400).json({message: 'No category found with this ID'})
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
