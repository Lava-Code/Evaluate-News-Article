var path = require('path');
const dotenv = require('dotenv');
const fetch = require("node-fetch");
// Configure the environment variables
dotenv.config();
const mockAPIResponse = require('./mockAPI.js')
const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const KEY_Val = process.env.API_KEY;

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Define the server,and initiate server port make express listen on port 9000 and create arrow function for listening
const port = 9000;
app.listen(port, () => { console.log(`The server is up and runing on port:${port}`) });

/* Middleware*/
// Configure Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

//Configure express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//Configure express static directory.
app.use(express.static('dist'))

console.log(__dirname)


app.get('/', function (req, res) {
    //res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});


// Routes for POST
app.post('/post', async function (request, response) {
    const API_URL = `${BASE_API_URL}?key=${KEY_Val}&url=${request.body.url}&lang=en`;
    console.log(API_URL);
    const apiResponse = await fetch(API_URL);
    try {
        const articleData = await apiResponse.json();
        const returnedData = {
            text: articleData.sentence_list[0].text,
            score_tag: articleData.score_tag,
            agreement: articleData.agreement,
            subjectivity: articleData.subjectivity,
            confidence: articleData.confidence,
            irony: articleData.irony,
        }
        response.send(returnedData)
        //console.log(returnedData);
        return returnedData
    }catch(error){
        console.log('Error in :',error);
    };
    
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

