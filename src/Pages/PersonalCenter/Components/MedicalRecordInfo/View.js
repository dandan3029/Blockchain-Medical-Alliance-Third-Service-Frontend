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

    render()
    {   
        const {
            medicalRecordInfoId,
            treatmentDate,
            treatmentHospital,
        } = this.props;
        return (
            <tr className={Style.MedicalRecordInfo}>
                <td>{treatmentDate}</td>
                <td>{treatmentHospital}</td>
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
    medicalRecordInfoId: PropTypes.string.isRequired,
    treatmentDate: PropTypes.string.isRequired,
    treatmentHospital: PropTypes.string.isRequired,
    onMedicalRecordButtonClick: PropTypes.func.isRequired,
    onAuthorizationButtonClick: PropTypes.func.isRequired,
};

export default MedicalRecordInfo;