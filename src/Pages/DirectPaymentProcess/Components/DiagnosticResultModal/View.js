import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Modal} from '../../../../Components/Modal';
import {MODAL_ID} from '../../../../Constant';

class DiagnosticResultModal extends React.Component
{
    render()
    {
        const {diagnosticResult} = this.props;
        return (
            <Modal id={MODAL_ID.DIAGNOSTIC_RESULT_MODAL} title={'诊断结果'} className={Style.DiagnosticResultModal}>
                {diagnosticResult}
            </Modal>
        );
    }
}

DiagnosticResultModal.propTypes = {
    diagnosticResult: PropTypes.string.isRequired,
};

export default DiagnosticResultModal;