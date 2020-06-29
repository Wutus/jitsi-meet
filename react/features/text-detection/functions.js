import AWS from 'aws-sdk';
import Textract from 'aws-sdk/clients/textract'


function getBlobFromMediaStream(stream) {

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.srcObject = stream;

    return new Promise((resolve, reject) => {
        try {
            video.addEventListener('loadeddata', event => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.play().then(() => {
                    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    canvas.toBlob(resolve, 'image/png');
                });
            });
        } catch(error) {
            reject(error);
        }
    });
}


export function blobToArray(blob) {

    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);             
            }
            reader.readAsArrayBuffer(blob); 
        } catch(error) {
            reject(error);
        }
    });
}


export function blobToStr(blob) {

    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);             
            }
            reader.readAsDataURL(blob); 
        } catch(error) {
            reject(error);
        }
    });
}


function logIn() {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:2bbfc1e1-20ab-47fe-927b-2794b95f18b8',
        // Logins: {
        //     'cognito-idp.us-east-1.amazonaws.com/us-east-1_jC6jjR0kz': localStorage.getItem('access_token')
        // }
    });
}


// function getDetectionsRek(base64) {
//     logIn();

//     let rekognition = new AWS.Rekognition();
//     let params = {
//         Image: {
//             Bytes: base64
//         }
//     };

//     return new Promise((resolve, reject) => {
//         rekognition.detectText(params, function(err, data) {
//             if (err) {
//                 reject(err);
//             }
//             else
//                 resolve(data);
//         });
//     });
    
// }


function getDetections(base64) {
    logIn();

    let textract = new Textract();
    let params = {
        Document: {
            Bytes: base64
        }
    };

    return new Promise((resolve, reject) => {
        textract.detectDocumentText(params, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
    
}


export async function getText(blob) {
    let blobArray = await blobToArray(blob);
    let detections = await getDetections(blobArray);
    return detections.Blocks
        .filter(x => x.BlockType == 'LINE')
        .map(x => x.Text)
        .join('\n');
}


export function getFrameBlob() {
    let mediaStream = APP.UI.getLargeVideo().videoContainer.stream.stream;
    return getBlobFromMediaStream(mediaStream);
}


export function isWithLargeVideo() {
    return APP.UI.getLargeVideo()?.videoContainer?.stream?.stream != undefined;
}