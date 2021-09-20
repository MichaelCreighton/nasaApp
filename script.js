
nasaApp = {};

nasaApp.key = "V4iTtSgcifpr3Z87WmhEpDFcI0g0xqt8JsSubI1a";

// function to query nasa api 
nasaApp.getPics = function(query) {
    
    // construct url with search params 
    const url = new URL("https://api.nasa.gov/planetary/apod");
    
 if(query === 'rnd') {
    url.search = new URLSearchParams({
        api_key: nasaApp.key,
        count: 9
    });
    } else {
        url.search = new URLSearchParams({
            api_key: nasaApp.key,
            date: ''
        });
    }
   
    // fetch the api for APOD 
    fetch(url)
    .then(data => {               
        return data.json();
    })
    .then(jsonData => {
        if(query === 'rnd') {
            nasaApp.displayPics(jsonData);
        } else {
            nasaApp.displayToday(jsonData);
        }        
    })
        
}



    nasaApp.displayAnything = function(picObject) {

        const title = document.createElement("h2");
        title.innerText = picObject.title;


        const date = document.createElement("p");
        date.innerText = picObject.date;


        const image = document.createElement("img");
        if (typeof picObject.hdurl !== "undefined") {
            image.src = picObject.url;
        } else {
            image.src = "./original.webp";
        }

        const hdLink = document.createElement("a");
        hdLink.innerText = "Click for Full Size or movie";
        hdLink.target = "blank";
        hdLink.rel = "noopener noreferer";
        if (typeof picObject.hdurl !== "undefined") {
            hdLink.href = picObject.hdurl;
        } else {
            hdLink.href = picObject.url;
        }

        const explain = document.createElement("p");
        explain.innerText = picObject.explanation;

        const confirmation = document.createElement("h3");
        confirmation.innerText = "Do I Like it?"

        const btn = document.createElement("button");
        btn.classList.add("like");
        // btn.innerHTML = '<i class="fa-solid fa-heart"></i>"';
        btn.innerText = "LIKE THIS ONE?";
        
        const eachPic = document.createElement("div");
        eachPic.classList.add("pic");

        // add the new HTML to the page
        eachPic.appendChild(title);
        eachPic.appendChild(date);
        eachPic.appendChild(image);
        eachPic.appendChild(hdLink);
        eachPic.appendChild(explain);
        eachPic.appendChild(confirmation);
        eachPic.appendChild(btn);
        
        document.querySelector("#spacePic").append(eachPic);

        nasaApp.setLikeListeners();
    }
    
    nasaApp.setLikeListeners = function() {
        document.querySelectorAll(".like").forEach((like) =>
          like.addEventListener("click", function (e) {
            //   e.target.classList.toggle("boom");
              if (e.target.classList.contains("boom")) {
                  e.target.innerText = "YES, I LIKE THIS!";
                  e.target.classList.toggle("boom");
              } else {
                e.target.innerText = "NO, I DON'T LIKE THIS!";
                e.target.classList.toggle("boom");
            }
              })
            );
    }

    nasaApp.likeToggle = function (e) {
        if(e.target.classList.contains('boom')) {
            e.target.innerText = "I LIKE THIS!";
            e.target.classList.toggle('boom');
        } else {
            e.target.innerText = "I DON'T LIKE THIS!";
            e.target.classList.toggle('boom');
        }
    };
        

    // function display todays APOD 
    nasaApp.displayToday = function(picObject) {        
      // clear the html for new pics
      const clearHtml = document.querySelector("#spacePic");
      clearHtml.innerHTML = "";

      this.displayAnything(picObject);
    }


//  function to display the info from all random APOD objects
nasaApp.displayPics = function(arrayOfPicObjects) {
   
    // clear the html for new pics
    const clearHtml = document.querySelector('#spacePic');
    clearHtml.innerHTML = '';

    // working with array of objects [{}, {}, {}]
    arrayOfPicObjects.forEach(picObject => {
        this.displayAnything(picObject);
    });

}


nasaApp.setEventListeners = function () {
  document.querySelector("#choice").addEventListener("click", function () {
    const choice = this.value;
    nasaApp.getPics(choice);
  });

  
};


nasaApp.init = function () {
    nasaApp.setEventListeners();
}


nasaApp.init();
