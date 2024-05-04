async function submitForm(e, placement){
    e.preventDefault();
    
    if(placement == 'headwear'){                            //Based on where to add from, create a files variable with files from placement input.
        var files = document.getElementById("headwearImageUpload");
    }

    if(placement == 'tops'){
        var files = document.getElementById("topsImageUpload")
    }

    if(placement == 'bottoms'){
        var files = document.getElementById("bottomsImageUpload")
    }

    const formData = new FormData();
    
    for(let i = 0; i < files.files.length; i++){            //Adding files to formData object

        formData.append("files", files.files[i]);
    }   


    fetch("http://localhost:3000/upload", {                 //Sending formData to backend.
        method: "POST",
        body: formData,
    })

    .then(response => response.json())                      //Getting response from backend and parsing as json.

    .then(data => {
        const urls = data.images;                           //Creating array of urls from data.

        if(placement == 'headwear'){                        //Based on placement, go through array of urls and add to correct image array.
            for(let i = urls.length - 1; i >= 0; --i){
                const img = urls[i];
                headwear.push(img);
            }
        }

        if(placement == 'tops'){
            for(let i = urls.length - 1; i >= 0; --i){
                const img = urls[i];
                tops.push(img);
            }
        }

        if(placement == 'bottoms'){
            for(let i = urls.length - 1; i >= 0; --i){
                const img = urls[i];
                bottoms.push(img)
            }
        }
    })

    .catch(error => {
        console.error('Error: ', error);
        alert('Image upload and processing failed.');
    });
}