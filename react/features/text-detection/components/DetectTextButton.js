import React from 'react';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox';
import { translate } from '../../base/i18n';
import { IconHelp } from '../../base/icons';
import { connect } from '../../base/redux';
import AWS from 'aws-sdk';


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


function blobToBase64(blob) {
    let uInt8Array = new Uint8Array(blob);
    let i = uInt8Array.length;
    var biStr = [];
    while (i--) { biStr[i] = String.fromCharCode(uInt8Array[i]);  }
    var base64 = btoa(biStr.join(''));
    return base64;
}


function getText(base64) {
    let rekognition = new AWS.Rekognition();
    let params = {
        Image: {
            Bytes: base64
        }
        // ,
        // Filters: {
        //     MinConfidence: 50
        // }
    };

    return new Promise((resolve, reject) => {
        rekognition.detectText(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else
                resolve(data);
        });
    });
    
}


class DetectTextButton extends AbstractButton<AbstractButtonProps, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.help';
    icon = IconHelp;
    label = 'toolbar.help';

    /**
     * Handles clicking / pressing the button.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        let mediaStream = APP.UI.getLargeVideo().videoContainer.stream.stream;
        getBlobFromMediaStream(mediaStream).then(async blob => {
            let base64 = blobToBase64(blob);
            let data = await getText(base64);
            console.log(data);
        });

        
        console.log('new button clicked');
    }
}

export default translate(connect()(DetectTextButton));

// export default class DetectTextButton extends React.Component {
    
//     render() {
//         return (
//             <h1>TEST</h1>
//         );
//     }
// }
