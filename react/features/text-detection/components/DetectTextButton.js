import React from 'react';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox';
import { translate } from '../../base/i18n';
import { IconShareDoc } from '../../base/icons';
import { connect } from '../../base/redux';


type Props = AbstractButtonProps & {

    afterClick: Function
};


class DetectTextButton extends AbstractButton<Props, *> {

    tooltip = 'Extract text';
    icon = IconShareDoc;

    /**
     * Handles clicking / pressing the button.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.afterClick();
    }
}

export default translate(connect()(DetectTextButton));
