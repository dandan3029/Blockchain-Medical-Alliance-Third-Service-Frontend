import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class MedicalRecordModal extends React.Component
{
    render()
    {
        const {medicalRecordContent} = this.props;
        return (
            <Modal id={MODAL_ID.MEDICAL_RECORD_MODAL} title={'病例记录'} className={Style.MedicalRecordModal}>
                {medicalRecordContent}
            </Modal>
        );
    }
}

MedicalRecordModal.propTypes = {
    medicalRecordContent: PropTypes.string.isRequired,
};

export default MedicalRecordModal;