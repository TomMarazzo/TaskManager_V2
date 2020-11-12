//Link to Express Package
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Manager' });
});

/*GET/about*/
router.get('/about',(req, res) => {
  res.render('about', {
    message: 'Content from the controller goes here'
  })
})

module.exports = router;
