const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let users=[];
let photos=[];

app.put('/user',(req,res)=>{  //create user
    const username=req.body.username;
    const password=req.body.password;
    console.log(username.length);
    console.log(username.indexOf(" "));
    console.log(username.indexOf("_"));
    console.log(password.length);

    if (username.length<2 || username.length>16 || username.indexOf(" ")>-1 ||  username.indexOf("_")>-1 || password.length<6 || password.length>16 || !password.match("^[0-9a-zA-Z]+$")){
        
        res.status(402).send();
        console.log("bad input!!");
        
        return;
    }

    users.push({
        id: users.length+1,
        username: username,
        password: password
    });
    // console.log(users);
    res.status(201).send();
});

app.get('/user',(req,res)=>{  //get all users
    res.json(users);
});

app.get('/user/:id',(req,res)=>{  //get a specific user

    const  requestedUser = users.find(user=>{
        return user.id=== parseInt(req.params.id);
    });

    if (!requestedUser) { //in case the user doesnt exist
        res.status(404).send();
        return;
    }


    res.json(requestedUser);
});

app.post('/user/:id',(req,res)=>{  //edit user
    
    const  requestedUser = users.find(user=>{
        return user.id=== parseInt(req.params.id);
    });

    if (!requestedUser) { 
        res.status(404).send();
        return;
    }

    res.json(requestedUser);

    const index = users.indexOf(requestedUser);
    users[index].username=req.body.username;
    users[index].password=req.body.password;
	res.status(200).send();

});

app.delete('/user/:id', (req, res) => {     //delete photo
	const requestedUser = users.find(user => {
		return user.id === parseInt(req.params.id);
	});
	if (!requestedUser) {
		res.status(404).send();
		return;
	}
	const index = users.indexOf(requestedUser);
	users.splice(index, 1);
	res.status(204).send();
});

app.post('/user/login/:id',(req, res)=>{  //login 

    const  requestedUser = users.find(user=>{
        return user.username===req.body.username && user.password===req.body.password;
    });

    if (!requestedUser) { 
        res.status(403).send();
        return;
    };
    
    res.json(requestedUser); 
    res.status(200).send();
   
});

/// PHOTOS!!!

app.put('/photo',(req,res)=>{  //create photo

    const title=req.body.title;
    const filename=req.body.filename;

    if (title.length<1 || !(filename.slice(filename.indexOf(".")+1,filename.length)==="png" || filename.slice(filename.indexOf(".")+1,filename.length)==="jpg") ){
        
        res.status(402).send();
        console.log("bad input!!");
        return;
    }    
    
    photos.push({
        id: photos.length+1,
        title: title,
        filename : filename
    });
    // console.log(users);
    res.status(201).send();
});

app.get('/photo',(req,res)=>{  //get all photos
    res.json(photos);
});

app.get('/photo/:id',(req,res)=>{  //get a specific photo

    const  requestedPhoto = photos.find(photo=>{
        return photo.id=== parseInt(req.params.id);
    });

    if (!requestedPhoto) { //in case the photo doesnt exist
        res.status(404).send();
        return;
    }


    res.json(requestedPhoto);
});

app.post('/photo/:id',(req,res)=>{  //edit photo
    
    const  requestedPhoto = photos.find(photo=>{
        return photo.id=== parseInt(req.params.id);
    });

    if (!requestedPhoto) { 
        res.status(404).send();
        return;
    }

    res.json(requestedPhoto);

    const index = photos.indexOf(requestedPhoto);
    photos[index].title=req.body.title;
    photos[index].filename=req.body.filename;
	res.status(200).send();

});

app.delete('/photo/:id', (req, res) => {  //delete photo
	const requestedPhoto = photos.find(photo => {
		return photo.id === parseInt(req.params.id);
	});
	if (!requestedPhoto) {
		res.status(404).send();
		return;
	}
	const index = photos.indexOf(requestedPhoto);
	photos.splice(index, 1);
	res.status(204).send();
});





app.listen(port, () => console.log(`Example app listening on port ${port}!`));