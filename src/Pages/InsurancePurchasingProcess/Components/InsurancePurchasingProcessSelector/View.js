import React from 'react';
import Style from './Style.module.scss';
import {Object as SelectorObject, View as Selector} from '../../../../Components/Selector';
import {INSURANCE_PURCHASING_STAGE_ID, INSURANCE_PURCHASING_STAGE_ID_TO_TEXT,INSURANCE_COMPANY} from '../../../../Constant';
import {connect} from 'react-redux';
import {changeFilterInsuranceCompanyAction, changeFilterInsurancePurchasingStageAction, changeFilterInsurancePeriodRangeAction} from '../../Actions/Actions';
import { CONNREFUSED } from 'dns';

class InsurancePurchasingProcessSelector extends React.Component
{
    render()
    {
        const {
            companyName: currentActiveInsuranceCompany, 
            insurancePeriodRange:[minPeriod, maxPeriod],
            stageId: currentActiveStageId, 
            changeFilterInsuranceCompany, 
            changeFilterInsurancePurchasingStage,
            changeFilterInsurancePeriodRange,
        } = this.props;
        const {Series, Item} = SelectorObject;
        const seriesArray = [
            new Series('保险公司',Object.values(INSURANCE_COMPANY).map(companyName => new Item(companyName,
                () => 
                {
                    changeFilterInsuranceCompany(companyName);
                }, currentActiveInsuranceCompany === companyName), 
            )),
            new Series('保险保期',[
                new Item('全部',()=>{
                    changeFilterInsurancePeriodRange();
                }, minPeriod === Number.MIN_VALUE && maxPeriod === Number.MAX_VALUE),
                new Item('1-2 年', ()=>
                {
                    changeFilterInsurancePeriodRange(1,2);
                }, minPeriod === 1 && maxPeriod === 2),
                new Item('3-5 年',()=>
                {
                    changeFilterInsurancePeriodRange(3,5);
                },minPeriod === 3 && maxPeriod === 5),
                new Item('6-10 年', ()=>
                {
                    changeFilterInsurancePeriodRange(6,10);
                },minPeriod === 6 && maxPeriod === 10),
                new Item('10 年以上', ()=>
                {
                    changeFilterInsurancePeriodRange(11);
                }, minPeriod === 10 && maxPeriod === Number.MAX_VALUE)
            ]),
            /*new Series('状态', Object.values(INSURANCE_PURCHASING_STAGE_ID).map(stageId => new Item(INSURANCE_PURCHASING_STAGE_ID_TO_TEXT[stageId],
                    () =>
                    {
                        changeFilterInsurancePurchasingStage(stageId);
                    }, currentActiveStageId === stageId),
                )),*/
        ];
        return (<Selector className={Style.InsurancePurchasingProcessSelector} seriesArray={seriesArray} />);
    }
}

const mapStateToProps = state =>
{
    const {InsurancePurchasingProcess: {companyName, insurancePeriodRange,stageId}} = state;
    return {
        companyName,
        insurancePeriodRange,
        stageId,
    };
};

const mapDispatchToProps = {
    changeFilterInsuranceCompany: changeFilterInsuranceCompanyAction,
    changeFilterInsurancePurchasingStage: changeFilterInsurancePurchasingStageAction,
    changeFilterInsurancePeriodRange: changeFilterInsurancePeriodRangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePurchasingProcessSelector);