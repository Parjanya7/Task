const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

var name = 'dd';

const router = express.Router();

const app = express();

app.set('view engine','ejs');

const PORT = process.env.PORT || 4001;

app.listen( PORT, () => console.log(`Server Runnig on PORT: ${ PORT }`) );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( cors() );

app.get('/s', ( req, res ) => {

    console.log( `Request Received: ${ req.body }` );
    res.json(  "Server Connected.." );
});

var storage = multer.diskStorage({

    destination: ( req, file, cb ) => {
        cb( null, path.join(__dirname, 'FrontEnd') );
    },

    filename: ( req, file, cb ) => {
        cb( null,  file.originalname );
    }
});

const upload = multer({ storage : storage}).single('file');

app.post( '/ss', ( req, res ) => {

    console.log( req );    

    upload( req, res, (err) => {

//        console.log( req );
        console.log( req.file.filename );
        name = req.file.originalname;
        console.log( name ); 
        return res.status(200).send( req.file );
        return name;
    });
});



app.get( '/video', ( req, res ) => {

    const p = path.join( __dirname, 'FrontEnd', name );

        //3if( err != null && err.code === 'ENOENT' ) res.sendStatus(404);
        
        if( req ) console.log( req.body );

        const head = {  

            'Content-Type' : 'video/mp4'
        }

        res.writeHead( 200, head );
        fs.createReadStream(p).pipe(res);
    
});

/*

app.post( '/sss', ( req, res ) => {

    console.log(req.body.filename);
    const p = path.join(__dirname, `FrontEnd/${req.body.filename}`);
    res.send( p );
}); 

*/

