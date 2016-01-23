var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
        title: 'Home',
        page:'home'
    });
});

/* GET blog page. */
router.get('/blog', function(req, res) {
    var articleName = '';
    var myArticles = appdata.articles;
    var myImages = [];

    appdata.articles.forEach(function(item){
        myImages = myImages.concat(item.images);
    });

    res.render('sites/blog', { 
        title: 'Blog',
        articles: myArticles,
        images: myImages,
        page:'blog',
        article: articleName
    });
});

/* GET blog page with aritcle name. */
router.get('/blog/:articlename', function(req, res) {
    var articleName = req.params.articlename;

    var myArticles = appdata.articles;
    var myImages = [];

    appdata.articles.forEach(function(item){
        myImages = myImages.concat(item.images);
    });

    if(req.params.articlename=='dirty'){
        articleName='';
    }
    res.render('sites/blog', { 
        title: 'Blog',
        articles: myArticles,
        images: myImages,
        page:'blog',
        article: articleName
    });
});

/* GET login page. */
router.get('/login', function(req, res) {

    var users = appdata.security;

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    console.log('users info: '+users);
    console.log('\n\nrequest info: '+req.body.username+"\n\n");

    var data = {};
    users.forEach(function(user){
        if(user.username == reqUsername){
            if(user.password == reqPassword) {
                data = {
                    "Username": req.body.username,
                    "Password": req.body.password
                };
            }
        }
    });

    res.render('sites/login', { 
        title: 'Login',
        userinfo: data
    });


    if(data.length()>0){
        res.redirect('/loginsuccess'); 
    }
    else{
        res.redirect('/home'); 
    }

});

router.post('/loginsuccess', function(req, res) {

    var data = req.params.data;

    console.log(`Succeed data is ${data}`);

    res.render('sites/loginsuccess', { 
        title: 'Login Success',
        userinfo: data
    });
});

module.exports = router;
