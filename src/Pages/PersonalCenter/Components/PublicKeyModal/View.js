import React from 'react';
import Style from './Style.module.scss';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class PublicKeyModal extends React.Component
{
    render()
    {
        const {publicKey} = this.props;
        return (
            <Modal id={MODAL_ID.PUBLIC_KEY_MODAL} title={'公钥'} className={Style.PublicKeyModal}>
                <div className={Style.text}>
                    {publicKey}
                </div>
            </Modal>
        );
    }
}

export default PublicKeyModal;