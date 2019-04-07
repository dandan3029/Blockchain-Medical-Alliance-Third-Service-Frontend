import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        // case ACTION_TYPE.CHANGE_FILTER_AGE_RANGE:
        // {
        //     const {ageRange} = action;
        //     return {
        //         ...state,
        //         ageRange,
        //     };
        // }
        case ACTION_TYPE.CHANGE_FILTER_DIRECT_PAYMENT_MONEY_AMOUNT_RANGE:
        {
            const {directPaymentMoneyAmountRange} = action;
            return {
                ...state,
                directPaymentMoneyAmountRange,
            }
        }
        case ACTION_TYPE.CHANGE_FILTER_DIRECT_PAYMENT_STAGE:
        {
            const {stageId} = action;
            return {
                ...state,
                stageId,
            };
        }
        default:
        {
            return state;
        }
    }
}