import React from 'react';
import Style from './Style.module.scss';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class PrivateKeyModal extends React.Component
{
    render()
    {
        const {privateKey} = this.props;
        return (
            <Modal id={MODAL_ID.PRIVATE_KEY_MODAL} title={'私钥'} className={Style.PrivateKeyModal}>
                <div className={Style.text}>
                    {privateKey}
                </div>
            </Modal>
        );
    }
}

export default PrivateKeyModal;