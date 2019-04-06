import React from 'react';
import Style from './Style.module.scss';
import {Object as SelectorObject, View as Selector} from '../../../../Components/Selector';
import {INSURANCE_PURCHASING_STAGE_ID, INSURANCE_PURCHASING_STAGE_ID_TO_TEXT,INSURANCE_COMPANY} from '../../../../Constant';
import {connect} from 'react-redux';
import {changeFilterInsuranceCompanyAction, changeFilterInsurancePurchasingStageAction} from '../../Actions/Actions';
import { CONNREFUSED } from 'dns';

class InsurancePurchasingProcessSelector extends React.Component
{
    render()
    {
        const {companyName: currentActiveInsuranceCompany, stageId: currentActiveStageId, changeFilterInsuranceCompany, changeFilterInsurancePurchasingStage} = this.props;
        const {Series, Item} = SelectorObject;
        const seriesArray = [
            new Series('公司',Object.values(INSURANCE_COMPANY).map(companyName => new Item(companyName,
                () => 
                {
                    changeFilterInsuranceCompany(companyName);
                }, currentActiveInsuranceCompany === companyName), 
            )),
            new Series('状态', Object.values(INSURANCE_PURCHASING_STAGE_ID).map(stageId => new Item(INSURANCE_PURCHASING_STAGE_ID_TO_TEXT[stageId],
                    () =>
                    {
                        changeFilterInsurancePurchasingStage(stageId);
                    }, currentActiveStageId === stageId),
                )),
        ];
        return (<Selector className={Style.InsurancePurchasingProcessSelector} seriesArray={seriesArray} />);
    }
}

const mapStateToProps = state =>
{
    const {InsurancePurchasingProcess: {companyName, stageId}} = state;
    return {
        companyName,
        stageId,
    };
};

const mapDispatchToProps = {
    changeFilterInsuranceCompany: changeFilterInsuranceCompanyAction,
    changeFilterInsurancePurchasingStage: changeFilterInsurancePurchasingStageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePurchasingProcessSelector);