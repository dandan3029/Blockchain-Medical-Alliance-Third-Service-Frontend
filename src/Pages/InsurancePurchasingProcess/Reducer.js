import * as ACTION_TYPE from './Actions/ACTION_TYPE';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ACTION_TYPE.CHANGE_FILTER_INSURANCE_COMPANY:
        {
            const {companyName} = action;
            return {
                ...state,
                companyName,
            };
        }
        case ACTION_TYPE.CHANGE_FILTER_INSURANCE_PURCHASING_STAGE:
        {
            const {stageId} = action;
            return {
                ...state,
                stageId,
            };
        }
        case ACTION_TYPE.CHANGE_FILTER_INSURANCE_PERIOD_RANGE:
        {
            const {insurancePeriodRange} = action;
            return {
                ...state,
                insurancePeriodRange,
            }
        }
        default:
        {
            return state;
        }
    }
}