import React from 'react';
import InsurancePurchasingDetail from './View';
import leftImage from '../../Static/InsurancePurchasingDetail/leftImage.png';
import {browserHistory, withRouter} from 'react-router';
import Api from '../../Api';
import {PAGE_ID_TO_ROUTE, REQUIRE_LOGIN_PAGE_ID} from '../../Config';

class InsurancePurchasingDetailContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insuranceImageSrc: leftImage,   // 保险图片
            insuranceName: '',              // 保险名称
            isSpecialMedicalCare: 0,        // 是否特殊医疗
            hasSocialSecurity: 0,           // 有无社保
            insuranceAmount: 0,             // 保额
            insurancePeriod: '',            // 保险期限
            insuranceDiseaseType: '',       // 保险病种
            coveringAge: '',                // 承保年龄
            insurancePrice: 0,              // 保费价格
            electronicInsurancePolicy: '',  // 电子保单
            hasGotInfo: false,
        };
    }

    componentDidMount()
    {
        const {insurancePurchasingId} = this.props.location.query;
        if (insurancePurchasingId === undefined)
        {
            browserHistory.push(PAGE_ID_TO_ROUTE[REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS]);
        }
        else
        {
            /*Api.sendGetInsuranceDetailRequestAsync(insuranceId)
                .then(insuranceDetail =>
                {
                    if (insuranceDetail)
                    {
                        this.setState({
                            hasGotInfo: true,
                            ...insuranceDetail,
                        });
                    }
                });*/
            const insurancePurchasingDetailInfo = {
                insuranceImageSrc: leftImage,   // 保险图片
                insuranceName: '少儿英才保险',              // 保险名称
                isSpecialMedicalCare: 0,        // 是否特殊医疗
                hasSocialSecurity: 0,           // 有无社保
                insuranceAmount: 0,             // 保额
                insurancePeriod: '3年',            // 保险期限
                insuranceDiseaseType: '肺结核，狂犬病',       // 保险病种
                coveringAge: '20岁以下',                // 承保年龄
                insurancePrice: Math.round(Math.random()*2000+1000),              // 保费价格
                electronicInsurancePolicy: '这是一份电子保单',  // 电子保单
            }
            this.setState({
                hasGotInfo: true,
                ...insurancePurchasingDetailInfo,
            })
        }
    }


    render()
    {
        const {
            hasGotInfo,
            insuranceImageSrc,
            insuranceName,
            isSpecialMedicalCare,
            hasSocialSecurity,
            insuranceAmount,
            insurancePeriod,
            insuranceDiseaseType,
            coveringAge,
            salesArea,
            insurancePrice,
            electronicInsurancePolicy,
        } = this.state;
        return (
            <InsurancePurchasingDetail      hasGotInfo={hasGotInfo}
                                            insuranceImageSrc={insuranceImageSrc}
                                            insuranceName={insuranceName}
                                            isSpecialMedicalCare={isSpecialMedicalCare}
                                            hasSocialSecurity={hasSocialSecurity}
                                            insuranceAmount={insuranceAmount}
                                            insurancePeriod={insurancePeriod}
                                            insuranceDiseaseType={insuranceDiseaseType}
                                            coveringAge={coveringAge}
                                            salesArea={salesArea}
                                            insurancePrice={insurancePrice} 
                                            electronicInsurancePolicy={electronicInsurancePolicy}/>
        );
    }
}

export default withRouter(InsurancePurchasingDetailContainer);