// Importing necessary modules

const cors = require('cors');

const { removeBackground } = require('@imgly/background-removal-node');

const puppeteer = require('puppeteer');

const express = require('express');

const multer = require('multer');

const app = express();

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

function b64toBlob(b64Data, contentType = '', sliceSize = 512) {                    //Function to convert base64 string to a blob
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

app.post('/upload', upload.array('files'), async (req, res) => {
    const files = req.files;

    if(!files || files.length === 0){
        return res.status(400).send('No files uploaded.');
    }

    processedImages = [];

    for(let i = 0; i < files.length; i++){
        try{
            const base64Image = Buffer.from(files[i].buffer).toString('base64');    //Converting buffer for each image to base64 string
            const mt = files[i].mimetype;                                           //Getting mimetype for buffer
            const imgJson = {mimeType: mt, image: base64Image};                     //Creating json with containing mimetype and image
            const pass = b64toBlob(imgJson.image, imgJson.mimeType);                //Converting blob from buffer data and mimetype
            const blob = await removeBackground(pass);                              //Removing background from blob using remove-background package
            const buffer = Buffer.from(await blob.arrayBuffer());                   //Creating buffer from image with background removed
            const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;   //Creating data url from buffer with background removed

            processedImages.push(dataURL);                                          //Pushing data url with background removed to processedImages array

        } catch (error) {
            console.error('Error processing image: ', error);
        }
    }

    res.json({images: processedImages});                                            //Sending processedImages array as json to frontend with images key
})

app.post('/open', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const browser = await puppeteer.launch( {headless: false} );
	const page = await browser.newPage();

	await page.goto('https://www.pinterest.com/login/');

    await page.waitForSelector('#email');
    await page.type('#email', username);
    await page.waitForSelector('#password');
    await page.type('#password', password);
    await page.click('[data-test-id="registerFormSubmitButton"]');
    
    await page.waitForSelector('.HEm adn yQo lnZ wsz');
    await page.click('.HEm adn yQo lnZ wsz');

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
