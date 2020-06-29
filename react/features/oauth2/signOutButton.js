import { AbstractButton } from '../base/toolbox';
import { IconSignout } from '../base/icons';
import { cognitoSignOut } from './cognito';

import { translate } from '../base/i18n';
import { connect } from '../base/redux';
import type { AbstractButtonProps } from '../base/toolbox';

declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of {@link SettingsButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

class SignOutButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.Signout';
    icon = IconSignout;
    label = 'toolbar.Signout';
    tooltip = 'toolbar.Signout';

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const {
            dispatch } = this.props;
        cognitoSignOut();
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code SettingsButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
* }}
*/
function _mapStateToProps(state): Object { // eslint-disable-line no-unused-vars
    // XXX: We are not currently using state here, but in the future, when
    // interfaceConfig is part of redux we will.

    return {
    };
}

export default translate(connect(_mapStateToProps)(SignOutButton));