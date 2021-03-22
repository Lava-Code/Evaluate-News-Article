import { checkUrl } from './checkURL'
const baseUrl = 'http://localhost:9000';

const postArticle = async (url = '', data = {}) => {
    // Wait until the API respond (reach the url and respond) and move to try.
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        // Wait until the API respond (convert the response to JSON) and return the result.
        const dataToPost = await response.json();
        //console.log(dataToPost);
        return dataToPost;
    } catch (error) {
        console.log('Error in :', error);
    };
};

function handleSubmit(event) {
    event.preventDefault()
    let requestedArticle = document.getElementById('article-url').value;
    // Validate the Input URL by invoking the check function
    if (checkUrl(requestedArticle)) {
    postArticle(baseUrl + '/post', { url: requestedArticle })
        .then((data) => {
            // Using .then techniqe to wait until End point fetch the data and use the returned data to update UI
            //console.log(data)
            document.getElementById('text').innerHTML = `Text: ${data.text}`;
            document.getElementById('score_tag').innerHTML = `Score Tag: ${data.score_tag}`;
            document.getElementById('agreement').innerHTML = `Agreement: ${data.agreement}`;
            document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
            document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
            document.getElementById('irony').innerHTML = `Irony: ${data.irony}`;
        })
    }else{
        alert('Invalid URL Tray Agian');
    }
   // console.log(requestedArticle)
}

export { handleSubmit }
