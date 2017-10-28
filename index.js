var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Model=require("./model");
mongoose.connect('mongodb://swealth:temp1234@ds137435.mlab.com:37435/swealth');

var db = mongoose.connection;
db.once('open', function () {
    console.log("connected to mongo DB");
});
/*************************/
/*var hyperHelper=require('./HypertrackHelper');
hyperHelper.assignAction('24777e89-05e9-4c2e-ab6a-c5dc6eb18e45','e7de8159-6ff4-48c7-898a-d4ef88618b91');*/


/************Code********/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post('/user/login', function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    var check={
        Email:email,
        Password:password
    };
    Model.Customer.find(check,function(error,info){
        if (info) {
            res.send("[{failed:0,success:1},{data:[" + info + "]}]");
        } else {
            res.send("[{failed:1,success:0},{data:[]}]");
            console.log("Error getting an item:" + error);
        }
    })
    //customerHelper.loginTheCustomer(req, res);
});

app.post('/donor/login', function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    var check={
        Email:email,
        Password:password
    };
    Model.Donor.find(check,function(error,info){
        if (info) {
            res.send("[{failed:0,success:1},{data:[" + info + "]}]");
        } else {
            res.send("[{failed:1,success:0},{data:[]}]");
            console.log("Error getting an item:" + error);
        }
    })
    //customerHelper.loginTheCustomer(req, res);
});

app.post('/bank/login', function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    var check={
        Email:email,
        Password:password
    };
    Model.Bank.find(check,function(error,info){
        if (info) {
            res.send("[{failed:0,success:1},{data:[" + info + "]}]");
        } else {
            res.send("[{failed:1,success:0},{data:[]}]");
            console.log("Error getting an item:" + error);
        }
    })
    //customerHelper.loginTheCustomer(req, res);
});

app.post('/user/signup',function(req,res){
    var iName=req.body.name;
    var iEmail=req.body.email;
    var iPassword=req.body.password;
    var iHypertrackId=req.body.hypertrackid;
    var iLat=req.body.lat;
    var iLong=req.body.long;
    var iAddress=req.body.address;
    //var iSoldBy=req.body.soldby;
    //var iSoldByName=req.body.vendorname;
    if ((iName)&&(iEmail)&&(iPassword)&&(iHypertrackId)&&(iLat)&&(iLong)) {
        var user = {Name: iName, Email: iEmail, Location: {long: iLong, lat: iLat, Address:iAddress}, Password:iPassword,HypertrackId:iHypertrackId};
        var check = {Name: iName, Email: iEmail, Password: iPassword};
        var options = {upsert: true};
        Model.Customer.update(check, item, options, function (error, info) {
            if (info) {
                res.send("[{failed:0,success:1}]");
                console.log(info);
            } else {
                res.send("[{failed:1,success:0}]");
                console.log("Error Adding Item:" + error);
            }
        });
    }else{
        util.sendInvalidDetails(res);
    }
});


app.get('/*', function (req, res) {
    res.send("{error:'wrong endpoint'}");
});

app.set('port', (process.env.PORT || 8480));

app.listen(app.get('port'), function () {
    console.log('Api running on port');
});
