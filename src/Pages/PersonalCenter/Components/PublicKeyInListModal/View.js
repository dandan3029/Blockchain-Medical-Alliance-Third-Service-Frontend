import React from 'react';
import Style from './Style.module.scss';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class PublicKeyInListModal extends React.Component
{
    render()
    {
        const {publicKey} = this.props;
        return (
            <Modal id={MODAL_ID.PUBLIC_KEY_IN_LIST_MODAL} title={'公钥'} className={Style.PublicKeyInListModal}>
                <div className={Style.text}>
                    {publicKey}
                </div>
            </Modal>
        );
    }
}

export default PublicKeyInListModal;