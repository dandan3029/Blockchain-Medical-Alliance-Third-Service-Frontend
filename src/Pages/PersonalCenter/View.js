import React from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../Components/Card';
import identification1 from '../../Static/PersonalCenter/identification1.png';
import identification2 from '../../Static/PersonalCenter/identification2.png';
import NAMESPACE from '../../NAMESPACE';
import {MODAL_ID} from '../../Constant';
import {Function as ModalFunction} from '../../Components/Modal';
import {View as MedicalRecordInfo} from './Components/MedicalRecordInfo';
import {View as MedicalRecordModal} from './Components/MedicalRecordModal';
import {View as AuthorizationModal} from './Components/AuthorizationModal';

class PersonalCenter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            personalInfo: '',
            medicalRecordInfoList:[],
            currentActiveMedicalRecordInModal: '',
            currentActiveAuthorizationInModal: '',
        }
    }
    componentDidMount(){
        const medicalRecordInfoList = []
        for( let i = 0; i < 5 ; i++ )
        {
            medicalRecordInfoList.push(
                {
                    medicalRecordInfoId: i,
                    treatmentDate: '2019年4月3日',
                    treatmentHospital: '北京协和医院',
                    treatmentDoctor: '王艳',
                    publicKey: 'da;flkjewp',
                    medicalRecordContent: '这是一份电子病例',
                }
            )
        }
        const personalInfo = {
            name: '蒋小斐',
            age: '32',
            location: '辽宁省大连市',
            email: '123456',
            publicKey: 'fdla;weopdlkfj',
            privateKey:'fdla;weopdlkfj',
        }
        this.setState({
            personalInfo,
            medicalRecordInfoList,
        });
    }

    onMedicalRecordButtonClick = (medicalRecordContent) => 
    {
        return () =>
        {
            this.setState({
                currentActiveMedicalRecordInModal: medicalRecordContent,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.MEDICAL_RECORD_MODAL);
            });
        };
    }

    onAuthorizationButtonClick = (privateKey) =>
    {
        return () =>
        {
            this.setState({
                currentActiveAuthorizationInModal: privateKey,
            }, () => 
            {
                ModalFunction.showModal(MODAL_ID.AUTHORIZATION_MODAL);
            })
        }
    }

    render()
    {
        const {currentActiveMedicalRecordInModal, currentActiveAuthorizationInModal} = this.state;
        const {personalInfo, medicalRecordInfoList}= this.state;
        return (
            <div className={Style.PersonalCenter}>
                <div className={Style.contentWrapper}>
                    <div className={Style.leftPart}>
                        <Card className={Style.identificationWrapper}>
                            <div className={Style.identification} style={{background: `url('${identification1}')`}} />
                        </Card>
                        <Card className={Style.identificationWrapper}>
                            <div className={Style.identification} style={{background: `url('${identification2}')`}} />
                        </Card>
                    </div>
                    <div className={Style.rightPart}>
                        <div className={Style.personalInfoWrapper}>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>姓名：</div>
                                <div className={Style.info}>{personalInfo.name}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>年龄：</div>
                                <div className={Style.info}>{personalInfo.age}岁</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>公钥：</div>
                                <div className={Style.info}>{personalInfo.publicKey}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>私钥：</div>
                                <div className={Style.info}>{personalInfo.privateKey}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>家庭住址：</div>
                                <div className={Style.info}>{personalInfo.location}</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>联系方式：</div>
                                <div className={Style.info}>{personalInfo.email}</div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className={Style.modifyButtonWrapper}>
                    <button className={Style.modifyButton}>编辑</button>
                </div>

                <div className={Style.tableTitleWrapper} id="tableTitleWrapper">
                    <a className={Style.tableTitle} href="#tableTitleWrapper">我的病例</a>
                </div>
                <div className={Style.tableWrapper}>
                    <table className={`${Style.medicalRecordTable}`}>
                        <thead>
                        <tr>
                            <th scope="col">就诊日期</th>
                            <th scope="col">就诊医院</th>
                            <th scope='col'>负责医生</th>
                            <th scope='col'>公钥</th>
                            <th scope="col">病例记录</th>
                            <th scope="col">病例授权</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            medicalRecordInfoList.map(medicalRecord =>
                            {
                                const {
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.MEDICAL_RECORD_INFO_ID]: medicalRecordInfoId,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.TREATMENT_DATE]: treatmentDate,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.TREATMENT_HOSPITAL]: treatmentHospital,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.TREATMENT_DOCTOR]: treatmentDoctor,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.PUBLICKEY]: publicKey,
                                    [NAMESPACE.PERSONAL_CENTER.MEDICAL_RECORD_INFO.MEDICAL_RECORD_CONTENT]: medicalRecordContent,
                                } = medicalRecord;
                                return <MedicalRecordInfo   medicalRecordInfoId={medicalRecordInfoId}
                                                            key = {medicalRecordInfoId}
                                                            treatmentDate={treatmentDate}
                                                            treatmentHospital={treatmentHospital}
                                                            treatmentDoctor={treatmentDoctor}
                                                            publicKey={publicKey}
                                                            onMedicalRecordButtonClick={this.onMedicalRecordButtonClick(medicalRecordContent)}
                                                            onAuthorizationButtonClick={this.onAuthorizationButtonClick(personalInfo.privateKey)} />
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <MedicalRecordModal medicalRecordContent={currentActiveMedicalRecordInModal} />
                <AuthorizationModal privateKey={currentActiveAuthorizationInModal} />
            </div>
        );
    }
}

export default PersonalCenter;