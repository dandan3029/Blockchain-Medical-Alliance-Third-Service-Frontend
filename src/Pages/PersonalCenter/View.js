import React from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../Components/Card';
import companyLogo from '../../Static/PersonalCenter/companyLogo.jpg';
import certificate from '../../Static/PersonalCenter/certificate.jpg';

class PersonalCenter extends React.Component
{
    render()
    {
        return (
            <div className={Style.PersonalCenter}>
                <div className={Style.contentWrapper}>
                    <div className={Style.leftPart}>
                        <Card className={Style.certificateWrapper}>
                            <div className={Style.certificate} style={{background: `url('${certificate}')`}} />
                        </Card>
                    </div>
                    <div className={Style.rightPart}>
                        <Card className={Style.logoWrapper}>
                            <div className={Style.logo} style={{background: `url('${companyLogo}')`}} />
                        </Card>
                        <div className={Style.companyInfoWrapper}>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>公司：</div>
                                <div className={Style.info}>中国人寿</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>地址：</div>
                                <div className={Style.info}>辽宁省大连市金州区</div>
                            </Card>
                            <Card className={Style.infoWrapper}>
                                <div className={Style.label}>联系方式：</div>
                                <div className={Style.info}>0392-7120596</div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className={Style.modifyButtonWrapper}>
                    <button className={Style.modifyButton}>编辑</button>
                </div>
            </div>
        );
    }
}

export default PersonalCenter;