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


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post('/user/login', function (req, res) {
    var email=req.body.email;
    var password=req.body.password;
    //var lat=req.body.lat;
    //var long=req.body.long;
    var hypertrackid=req.body.hypertrackid
    console.log(email)
    console.log(password)
    console.log(hypertrackid)
    var check={
        Email:email,
        Password:password
    };
    Model.Customer.find(check,function(error,info){
        if (info && info.length>0) {
            if(hypertrackid){
        var user = {HypertrackId:hypertrackid};
        
        var options = {upsert: true};
        Model.Customer.update(check, user, options, function (error, info) {
            if (info) {
          
                console.log(info);
            } else {
          
                console.log("Error Adding Item:" + error);
            }
        });
    
            }
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
        Model.Customer.update(check, user, options, function (error, info) {
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

app.post('/donor/signup',function(req,res){
    var iName=req.body.name;
    var iEmail=req.body.email;
    var iPassword=req.body.password;
    var iHypertrackId=req.body.hypertrackid;
    var icomplexion=req.body.complexion;
    var ioccupation=req.body.occupation;
    var ibloodgroup=req.body.bloodgroup;
    var ibankname=req.body.bankname;

    //var iLat=req.body.lat;
    //var iLong=req.body.long;
    //var iAddress=req.body.address;
    //var iSoldBy=req.body.soldby;
    //var iSoldByName=req.body.vendorname;
    if (true) {
        var user = {BankName:ibankname,Name: iName, Email: iEmail, Password:iPassword,HypertrackId:iHypertrackId, BloodGroup:ibloodgroup,Complexion:icomplexion,Occupation:ioccupation};
        var check = {Name: iName, Email: iEmail, Password: iPassword};
        var options = {upsert: true};
        Model.Donor.update(check, user, options, function (error, info) {
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



app.post('/user/recommended',function(req,res){
    var icomplexion=req.body.complexion;
    var ibloodgroup=req.body.bloodgroup;
    var ioccupation=req.body.occupation;
     var check={
        BloodGroup:ibloodgroup,
        Occupation:ioccupation,
        Complexion:icomplexion,
    };
    Model.Donor.find(check,function(error,info){
        if (info && info.length>0) {
            res.send("[{failed:0,success:1},{data:[" + info + "]}]");
        } else {
            res.send("[{failed:1,success:0},{data:[]}]");
            console.log("Error getting an item:" + error);
        }
    })
});

app.get('/*', function (req, res) {
    res.send("{error:'wrong endpoint'}");
});

app.set('port', (process.env.PORT || 8480));

app.listen(app.get('port'), function () {
    console.log('Api running on port');
});
