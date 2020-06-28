import React from 'react';
import { Dialog } from '../../base/dialog';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import Header from './Header';
import TextArea from '@atlaskit/textarea';

import { getFrameBlob, blobToStr, getText } from '../functions';

type Props = {

    /**
     * Invoked to obtain translated strings.
     */
    t: Function,
};

/**
 * Invite More component.
 *
 * @returns {React$Element<any>}
 */
function DetectedTextDialog(props: Props) {
    const [imgSrc, setImgSrc] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [text, setText] = React.useState(null);

    async function extractText() {
        let blob = await getFrameBlob();
        setImgSrc(await blobToStr(blob));
        setLoading(true);
        let text = await getText(blob);
        setLoading(false);
        setText(text);
    }

    React.useEffect(() => {
        extractText();
    }, []);

    return (
        <Dialog
            cancelKey = { 'dialog.close' }
            customHeader = { Header }
            hideCancelButton = { true }
            submitDisabled = { true }
            width = { 'medium' }>
            <div className = 'invite-more-dialog'>
                { imgSrc && <img style={{width: '100%', marginBottom: 10}} src={imgSrc} /> }
                { loading && <span>Extracting text...</span> }
                { text && <TextArea isCompact isReadOnly value={text} /> }
            </div>
        </Dialog>
    );
}

export default translate(
    connect()(DetectedTextDialog)
);
