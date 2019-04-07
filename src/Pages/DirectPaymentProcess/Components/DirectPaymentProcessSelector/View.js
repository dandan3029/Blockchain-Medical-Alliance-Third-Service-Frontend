import React from 'react';
import Style from './Style.module.scss';
import {Object as SelectorObject, View as Selector} from '../../../../Components/Selector';
import {DIRECT_PAYMENT_STAGE_ID, DIRECT_PAYMENT_STAGE_ID_TO_TEXT} from '../../../../Constant';
import {connect} from 'react-redux';
import {changeFilterAgeRangeAction, changeFilterDirectPaymentStageAction, changeFilterDirectPaymentMoneyAmountRangeAction} from '../../Actions/Actions';

class DirectPaymentProcessSelector extends React.Component
{
    render()
    {
        const {Series, Item} = SelectorObject;
        const {
            ageRange: [minAge, maxAge], 
            directPaymentMoneyAmountRange:[minMoneyAmount,maxMoneyAmount], 
            stageId: currentSelectedStageId, 
            changeFilterAgeRange,
            changeFilterDirectPaymentMoneyAmountRange, 
            changeFilterDirectPaymentStage
        } = this.props;
        console.log(this.props);
        const seriesArray = [
            // new Series('年龄', [
            //     new Item('全部', () =>
            //     {
            //         changeFilterAgeRange();
            //     }, minAge === Number.MIN_VALUE && maxAge === Number.MAX_VALUE),
            //     new Item('1-20 岁', () =>
            //     {
            //         changeFilterAgeRange(1, 20);
            //     }, minAge === 1 && maxAge === 20),
            //     new Item('21-50 岁', () =>
            //     {
            //         changeFilterAgeRange(21, 50);
            //     }, minAge === 21 && maxAge === 50),
            //     new Item('51-80 岁', () =>
            //     {
            //         changeFilterAgeRange(51, 80);
            //     }, minAge === 51 && maxAge === 80),
            //     new Item('81 岁及以上', () =>
            //     {
            //         changeFilterAgeRange(81);
            //     }, minAge === 81 && maxAge === Number.MAX_VALUE),
            // ]),
            new Series('直付金额',[
                new Item('全部',()=>
                {
                    changeFilterDirectPaymentMoneyAmountRange();
                }, minMoneyAmount === Number.MIN_VALUE && maxMoneyAmount === Number.MAX_VALUE),
                new Item('1-2000 元', ()=>
                {
                    changeFilterDirectPaymentMoneyAmountRange(1,2000);
                },minMoneyAmount === 1 && maxMoneyAmount === 2000),
                new Item('2001-5000 元', ()=>
                {
                    changeFilterDirectPaymentMoneyAmountRange(2001,5000);
                },minMoneyAmount === 2001 && maxMoneyAmount === 5000),
                new Item('5001-10000 元', ()=>
                {
                    changeFilterDirectPaymentMoneyAmountRange(5001,10000);
                },minMoneyAmount === 5001 && maxMoneyAmount === 10000),
                new Item('10000 元以上', ()=>
                {
                    changeFilterDirectPaymentMoneyAmountRange(10001);
                }, minMoneyAmount === 10001 && maxMoneyAmount === Number.MAX_VALUE)
            ]),
            new Series('直付状态', Object.values(DIRECT_PAYMENT_STAGE_ID).map(stageId => new Item(DIRECT_PAYMENT_STAGE_ID_TO_TEXT[stageId],
                () =>
                {
                    changeFilterDirectPaymentStage(stageId);
                }, currentSelectedStageId === stageId))),
        ];
        return (<Selector seriesArray={seriesArray} className={Style.DirectPaymentProcessSelector} />);
    }
}

const mapStateToProps = state =>
{
    console.log(state);
    const {DirectPaymentProcess: {ageRange, directPaymentMoneyAmountRange, stageId}} = state;
    return {
        ageRange,
        directPaymentMoneyAmountRange,
        stageId,
    };
};

const mapDispatchToProps = {
    changeFilterAgeRange: changeFilterAgeRangeAction,
    changeFilterDirectPaymentStage: changeFilterDirectPaymentStageAction,
    changeFilterDirectPaymentMoneyAmountRange: changeFilterDirectPaymentMoneyAmountRangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectPaymentProcessSelector);