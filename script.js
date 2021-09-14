// nasa  key = V4iTtSgcifpr3Z87WmhEpDFcI0g0xqt8JsSubI1a;

// returns 5 random images in a JSON array
const demoCall = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5'

nasaApp = {};

nasaApp.key = "V4iTtSgcifpr3Z87WmhEpDFcI0g0xqt8JsSubI1a";

// function to query nasa api 
nasaApp.getPic = function(query) {
    // construct url with search params 
    const url = new URL(
      "https://api.nasa.gov/planetary/apod"
    );
    
    
    url.search = new URLSearchParams({
        api_key: nasaApp.key,
        count: 8
    });

    // fetch the api for APOD 
    fetch(url)
    .then(data => {  
        // console.log(data);
             
        return data.json();
    })
    .then(jsonData => {
        // console.log(jsonData);
        nasaApp.displayPics(jsonData); 
    })

}

// create function to display the info from objects
nasaApp.displayPics = function(arrayOfPicObjects) {
    // clear the html for new pics
    const clearHtml = document.querySelector('#spacePic');
    clearHtml.innerHTML = '';

    // working with array of objects [{}, {}, {}]
    arrayOfPicObjects.forEach(picObject => {

        const image = document.createElement('img');
        image.src = picObject.hdurl;

        const date =document.createElement('p');
        date.innerText = picObject.date;

        const explain = document.createElement('p');
        explain.innerText = picObject.explanation;

        const btn = document.createElement('button');
        btn.innerText = 'LIKE'

        const eachPic = document.createElement('div');
        eachPic.classList.add('pic');


        // add the new HTML to the page
        eachPic.appendChild(image);
        eachPic.appendChild(date);
        eachPic.appendChild(explain);
        eachPic.appendChild(btn);
        document.querySelector('#spacePic').append(eachPic);
    });

}












nasaApp.init = function () {
    nasaApp.getPic();
}


nasaApp.init();
