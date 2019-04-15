import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';

class MedicalRecordInfo extends React.Component
{
    stopPropagation = e =>
    {
        e.stopPropagation();
        e.cancelBubble = true;
    };

    onMedicalRecordButtonClick = e => 
    {
        this.stopPropagation(e);
        this.props.onMedicalRecordButtonClick(e);
    }

    onAuthorizationButtonClick = e => 
    {
        this.stopPropagation(e);
        this.props.onAuthorizationButtonClick(e);
    }

    onPublicKeyTdClick = (e) =>
    {
        this.stopPropagation(e);
        this.props.onPublicKeyTdClick(e);
    }

    render()
    {   
        const {
            medicalRecordInfoId,
            treatmentDate,
            treatmentHospital,
            doctor,
            pubkey,
        } = this.props;
        return (
            <tr className={Style.MedicalRecordInfo}>
                <td>{treatmentDate}</td>
                <td>{treatmentHospital}</td>
                <td>{doctor}</td>
                <td className={Style.publicKey} onClick={this.onPublicKeyTdClick}>{pubkey}</td>
                <td>
                    <button onClick={this.onMedicalRecordButtonClick}>查看</button>
                </td>
                <td>
                    <button onClick={this.onAuthorizationButtonClick}>授权</button>
                </td>
            </tr>
        );
    }
}

MedicalRecordInfo.propTypes = {
    medicalRecordInfoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    treatmentDate: PropTypes.string.isRequired,
    treatmentHospital: PropTypes.string.isRequired,
    doctor: PropTypes.string.isRequired,
    pubkey: PropTypes.string.isRequired,
    onMedicalRecordButtonClick: PropTypes.func.isRequired,
    onAuthorizationButtonClick: PropTypes.func.isRequired,
};

export default MedicalRecordInfo;