import React from 'react';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox';
import { translate } from '../../base/i18n';
import { IconHelp } from '../../base/icons';
import { connect } from '../../base/redux';


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
        console.log('new button clicked');
        let mediaStream = APP.UI.getLargeVideo().videoContainer.stream.stream;
        let track = mediaStream.getVideoTracks()[0];
        let imageCapture = new ImageCapture(track);
        imageCapture.grabFrame().then(frame => {
            console.log(frame);
        });
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
