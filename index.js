const express = require('express');
const app = express();
console.log('Starting express server...');
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server started successfully on port number ${server.address().port}`);
});


const err = new Error('message');

//const cors = require('cors');
//app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use((req, res, next) => {
    let date = new Date();
console.log(date);
    next();
});

app.use((req, res, next) => {
    const logEntry = `host: ${req.hostname}
    ip: ${req.ip}
    method: ${req.method}
    path: ${req.path}
    time: ${new Date()}`;
    console.log(logEntry);
    next();
});

const logger = (req, res, next) => {
    req.send(new Date());
    next();
}

const errorLogger = (err, req, res, next) => {
    console.log(err.stack);
    next(err);
}
app.use(errorLogger);

const sendError = (err, req, res) => {
    res.status(500).send(err.message);
}
app.use(sendError);

app.get('/', logger, (req, res) => {
    res.send('Hello, world!');
});

let names = ['JH', 'Chris', 'Rhys', 'Dale', 'Bob'];



app.get('/get', (req, res) => {res.send(names);});
app.post('/', (req, res) => {res.send(req.body);});
app.put('/', (req, res) => {console.log("put");});
app.patch('/', (req, res) => {console.log("patch");});
app.delete('/', (req, res) => {console.log("delete");});

app.get('/error1', (req, res) => {
    res.status(500).send('Mistakes were made');
});

app.get('/error2', (req, res) => {
    const err = new Error('Useful error message');
    next(err);
});

app.get('/error3', (req, res) => {
    res.status(500).send('Mistakes were made');
    throw new Error('Useful error message');
});




app.get('/getAll', (req, res) => {res.status(200).send(names)});

app.get('/getOne/:id', (req, res) => {res.status(200).send(names[req.params.id])});

app.delete('/delete/:id', (req, res) => {res.status(200).send(names.splice(req.params.id, 1))});


app.post('/post', (req, res) => {
    let name = req.body.name;
    names.push(name);
    res.status(201).send(names);
}
);

app.post('/replace/:i', (req, res) => {
    let i = req.params.i;
    let name = req.body.name;
    names[i] = name;
    res.status(201).send(names);
}
);