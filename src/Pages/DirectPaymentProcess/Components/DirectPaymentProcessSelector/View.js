import React from 'react';
import Style from './Style.module.scss';
import {Object as SelectorObject, View as Selector} from '../../../../Components/Selector';
import {DIRECT_PAYMENT_STAGE_ID, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../../../Constant';
import {connect} from 'react-redux';
import {changeFilterAgeRangeAction, changeFilterInsurancePurchasingStageAction} from '../../Actions/Actions';

class DirectPaymentProcessSelector extends React.Component
{
    render()
    {
        const {Series, Item} = SelectorObject;
        const {ageRange: [minAge, maxAge], stageId: currentSelectedStageId, changeFilterAgeRange, changeFilterInsurancePurchasingStage} = this.props;
        const seriesArray = [
            new Series('年龄', [
                new Item('全部', () =>
                {
                    changeFilterAgeRange();
                }, minAge === Number.MIN_VALUE && maxAge === Number.MAX_VALUE),
                new Item('1-20 岁', () =>
                {
                    changeFilterAgeRange(1, 20);
                }, minAge === 1 && maxAge === 20),
                new Item('21-50 岁', () =>
                {
                    changeFilterAgeRange(21, 50);
                }, minAge === 21 && maxAge === 50),
                new Item('51-80 岁', () =>
                {
                    changeFilterAgeRange(51, 80);
                }, minAge === 51 && maxAge === 80),
                new Item('81 岁及以上', () =>
                {
                    changeFilterAgeRange(81);
                }, minAge === 81 && maxAge === Number.MAX_VALUE),
            ]),
            new Series('状态', Object.values(DIRECT_PAYMENT_STAGE_ID).map(stageId => new Item(DIRECT_PAYMENT_STAGE_ID_TO_TEXT[stageId],
                () =>
                {
                    changeFilterInsurancePurchasingStage(stageId);
                }, currentSelectedStageId === stageId))),
        ];
        return (<Selector seriesArray={seriesArray} className={Style.DirectPaymentProcessSelector} />);
    }
}

const mapStateToProps = state =>
{
    const {DirectPaymentProcess: {ageRange, stageId}} = state;
    return {
        ageRange,
        stageId,
    };
};

const mapDispatchToProps = {
    changeFilterAgeRange: changeFilterAgeRangeAction,
    changeFilterInsurancePurchasingStage: changeFilterInsurancePurchasingStageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectPaymentProcessSelector);