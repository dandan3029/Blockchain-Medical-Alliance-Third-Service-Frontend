import React from 'react';
import Style from './Style.module.scss';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';
import Api from '../../../../Api';
import {SuccessAlert} from '../../../../Components/Alerts'

class AuthorizationModal extends React.Component
{
    constructor(props)
    {
        super(props);
        this.publicKeyInputRef = React.createRef();
    }

    onFormSubmit = async e => 
    {
        e.preventDefault();
        const publicKeyInput = this.publicKeyInputRef.current.value;
        const {publicKey} = this.props;
        if (publicKey === publicKeyInput)
        {
            //const requestIsSuccessful = true;
            const requestIsSuccessful = await Api.sendPostAuthorizationMedicalRecordRequestAsync(publicKey);
            console.log(requestIsSuccessful);
            if (requestIsSuccessful)
            {
                console.log(requestIsSuccessful);
                SuccessAlert.pop("病例授权成功");
            }
        }
    }

    render()
    {
        return (
            <Modal id={MODAL_ID.AUTHORIZATION_MODAL} title={'病例授权'} className={Style.AuthorizationModal} >
                <form className={Style.inputWrapper} onSubmit={this.onFormSubmit}>
                    <input type="text" placeholder={'请输入公钥'} autoFocus={true} ref={this.publicKeyInputRef} />
                    <button>授权</button>
                </form>
            </Modal>
        );
    }
}

export default AuthorizationModal;