import React from 'react';
import Style from './Style.module.scss';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class AuthorizationModal extends React.Component
{
    render()
    {
        const {privateKey} = this.props;
        return (
            <Modal id={MODAL_ID.AUTHORIZATION_MODAL} title={'病例授权'} className={Style.AuthorizationModal}>
                <div className={Style.inputWrapper}>
                    <input type="text" placeholder={'请输入私钥'} autoFocus={true}  />
                </div>
            </Modal>
        );
    }
}

export default AuthorizationModal;