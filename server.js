var express = require('express');
var app = express();

app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Server started');
});