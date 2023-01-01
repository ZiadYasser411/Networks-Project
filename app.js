var express = require('express');
var path = require('path');
var app = express();
var alert = require('alert');
const sessions = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

var session;

app.get('/', function(req,res){
  res.render('login');
});
app.get('/home', function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('home');
  }
});
app.get('/registration', function(req,res){
  res.render('registration');
});
app.get('/hiking', function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('hiking');
  }
});
app.get('/cities', function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('cities');
  }
});
app.get('/islands', function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('islands');
  }
});
app.get('/wanttogo', function(req,res){
  var u = req.session.userid;
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
      if(err) throw err;
      var db = client.db('myDB');
      db.collection('myCollection').findOne({Username:u},(err,find)=>{
        var golist = find.wanttogo;
        res.render('wanttogo',{golist:golist});
      })
    });
  }
});
app.get('/inca',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('inca');
  }
});
app.get('/annapurna',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('annapurna');
  }
});
app.get('/paris',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('paris');
  }
});
app.get('/rome',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('rome');
  }
});
app.get('/bali',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('bali');
  }
});
app.get('/santorini',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('santorini');
  }
});
app.get('/searchresults',function(req,res){
  if (!req.session.userid){
    alert("You need to login");
    res.redirect('/');
  } else{
    res.render('searchresults');
  }
});
app.get('/search', function(req, res) {
  res.render('searchresults');
});

app.post('/', function(req,res){
  a=req.body.username;
  b=req.body.password;

  if(a==='admin' && b==='admin'){
    session=req.session;
    session.userid = req.body.username;
    res.redirect('home');
  }
  else{
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
      if(err) throw err;
      var db = client.db('myDB');
      db.collection('myCollection').findOne({Username:a,password:b},(err,find)=>{
        if(find===null){
          alert("Invalid Username or Password");
        } else{
          session=req.session;
          session.userid = req.body.username;
          res.redirect('home');
        }
      })
    });
  }
});
app.post('/', function(req,res){
  res.redirect('registration');
});
app.post('/home', function(req,res){
  res.redirect('hiking');
});
app.post('/home', function(req,res){
  res.redirect('cities');
});
app.post('/home', function(req,res){
  res.redirect('islands');
});
app.post('/home', function(req,res){
  res.redirect('wanttogo');
});
app.post('/hiking', function(req,res){
  res.redirect('inca');
});
app.post('/hiking', function(req,res){
  res.redirect('annapurna');
});
app.post('/cities', function(req,res){
  res.redirect('paris');
});
app.post('/cities', function(req,res){
  res.redirect('rome');
});
app.post('/islands', function(req,res){
  res.redirect('bali');
});
app.post('/islands', function(req,res){
  res.redirect('santorini');
});
app.post('/search', function(req,res){
  const search = req.body.Search;
  const Destinations = ["annapurna","bali","inca","paris","rome","santorini"];
  const Results =[];
  let i = 0;
  while (i < Destinations.length) {
    if (Destinations[i].includes(search)) {
      Results.push(Destinations[i]);
    }
    i++;
  }
  res.render('searchresults',{searchterm:search,searchResults:Results});
});
app.post('/register', function(req,res){
  var x =req.body.username;
  var y =req.body.password;
  var wanttogo=[];
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').findOne({Username:x},(err,search)=>{
      if(search===null){
        db.collection('myCollection').insertOne({Username:x,password:y,wanttogo});
        alert("Registration was successful");
        res.redirect('/');
      } else{
        alert("Username already registered");
      }
    })
  });
});
app.post('/addannapurna', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('annapurna')){
          alert("Already added");
      } else{
        wtglist.push('annapurna');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});
app.post('/addbali', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('bali')){
          alert("Already added");
      } else{
        wtglist.push('bali');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});
app.post('/addinca', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('inca')){
          alert("Already added");
      } else{
        wtglist.push('inca');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});
app.post('/addparis', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('paris')){
          alert("Already added");
      } else{
        wtglist.push('paris');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});
app.post('/addrome', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('rome')){
          alert("Already added");
      } else{
        wtglist.push('rome');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});
app.post('/addsantorini', function(req,res){
  var user = req.session.userid;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');

    db.collection('myCollection').findOne({Username:user},(err,search)=>{
      var wtglist = search.wanttogo;
      if(wtglist.includes('santorini')){
          alert("Already added");
      } else{
        wtglist.push('santorini');
        db.collection('myCollection').updateOne({Username:user},{$set:{wanttogo:wtglist}});
      }
    })
  });
});


var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017/myDB", {useNewUrlParser:true,useUnifiedTopology:true}, function(err,client){
    if(err) throw err;
    var db = client.db('myDB');
});


if(process.env.PORT){
  app.listen(process.env.PORT , function() {console.log('Server started')});
}
else{
  app.listen(3000 , function() {console.log('Server started on port 3000')});
}