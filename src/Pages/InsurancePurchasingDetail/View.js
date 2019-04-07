import React from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {View as Card} from '../../Components/Card';
import Icon from 'antd/lib/icon';
import Radio from 'antd/lib/radio';
import Skeleton from 'antd/lib/skeleton';

function InsurancePurchasingDetail(props)
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
    } = props;
    return (
        <div className={Style.InsuranceDetail}>
            <Card className={Style.insuranceDetailContainer}>
                <div className={Style.imageWrapper}>
                    <img src={insuranceImageSrc} alt="insuranceImage" className={Style.image} />
                </div>
                <div className={Style.infoWrapper}>
                    <Skeleton active={true} loading={!hasGotInfo}>
                        <div className={Style.info}>
                            <div className={Style.insuranceNameWrapper}>
                                <div className={Style.insuranceName}>
                                <span className={Style.icon}>
                                    <Icon type="heart" theme="twoTone" twoToneColor={'#F00'} />
                                </span>
                                    {insuranceName}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>特需医疗</div>
                                <div className={Style.itemContent}>
                                    <Radio.Group defaultValue={!!isSpecialMedicalCare} disabled={true}>
                                        <Radio value={true}>包含</Radio>
                                        <Radio value={false}>不包含</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>有无社保</div>
                                <div className={Style.itemContent}>
                                    <Radio.Group defaultValue={!!hasSocialSecurity} disabled={true}>
                                        <Radio value={true}>有</Radio>
                                        <Radio value={false}>无</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保额</div>
                                <div className={Style.itemContent}>
                                    {insuranceAmount} 元
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保障期限</div>
                                <div className={Style.itemContent}>
                                    {insurancePeriod}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保险病种</div>
                                <div className={Style.itemContent}>
                                    {insuranceDiseaseType}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>承保年龄</div>
                                <div className={Style.itemContent}>
                                    {coveringAge}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>保费价格</div>
                                <div className={Style.itemContent}>
                                    {insurancePrice}
                                </div>
                            </div>
                            <div className={Style.itemWrapper}>
                                <div className={Style.label}>电子保单</div>
                                <div className={Style.itemContent}>
                                    {electronicInsurancePolicy}
                                </div>
                            </div>
                            <div className={Style.buttonWrapper} />
                        </div>
                    </Skeleton>
                </div>
            </Card>
        </div>
    );
}

InsurancePurchasingDetail.propTypes = {
    hasGotInfo: PropTypes.bool.isRequired,
    insuranceImageSrc: PropTypes.string.isRequired,
    insuranceName: PropTypes.string.isRequired,
    isSpecialMedicalCare: PropTypes.number.isRequired,   // 是否是特殊医疗，0 或 1
    hasSocialSecurity: PropTypes.number.isRequired,      // 有无社保，0 或 1
    insuranceAmount: PropTypes.number.isRequired,        // 保额，单位是人民币元
    insurancePeriod: PropTypes.string.isRequired,        // 保险期限
    insuranceDiseaseType: PropTypes.string.isRequired,   // 保险病种
    coveringAge: PropTypes.string.isRequired,            // 承保年龄
    // salesArea: PropTypes.string.isRequired,              // 销售区域
    insurancePrice: PropTypes.number.isRequired,         // 保费价格，单位是人民币元
};

export default InsurancePurchasingDetail;