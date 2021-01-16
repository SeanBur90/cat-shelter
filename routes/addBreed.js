var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addBreed', { title: 'Add breed form' });
});

router.post('/', (req, res, next) => {
  console.log('Someone clicked post')
  
  res.render('index')

  fs.readFile('./data/breeds.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err)
      return
    }
    let newBreed = req.body.breed;
    let currentBreeds = JSON.parse(data);
    currentBreeds.push(newBreed)
    console.log('The breed.json data is' , currentBreeds);
    let updatedBreeds = JSON.stringify(currentBreeds);
    console.log('JSON updated', updatedBreeds);

    fs.writeFile('./data/breeds.json', updatedBreeds, 'utf-8', () => {
      console.log('The breed was uploaded successfully...')
    })
    res.writeHead(301, { location: '/'});
    res.end();
  })


})

module.exports = router;
