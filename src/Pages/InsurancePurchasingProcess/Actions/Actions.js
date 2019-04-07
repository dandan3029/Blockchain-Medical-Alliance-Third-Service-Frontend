import * as ACTION_TYPE from './ACTION_TYPE';

export function changeFilterInsuranceCompanyAction(companyName)
{
    return {
        type: ACTION_TYPE.CHANGE_FILTER_INSURANCE_COMPANY,
        companyName,
    };
}

// export function changeFilterInsurancePurchasingStageAction(stageId)
// {
//     return {
//         type: ACTION_TYPE.CHANGE_FILTER_INSURANCE_PURCHASING_STAGE,
//         stageId,
//     };
// }

export function changeFilterInsurancePeriodRangeAction(minPeriod = Number.MIN_VALUE, maxPeriod = Number.MAX_VALUE)
{
    return {
        type: ACTION_TYPE.CHANGE_FILTER_INSURANCE_PERIOD_RANGE,
        insurancePeriodRange:[minPeriod, maxPeriod],
    }
}