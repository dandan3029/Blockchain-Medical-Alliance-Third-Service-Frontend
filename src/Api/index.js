import InsuranceListProcessor from './InsuranceList';
import InsurancePurchasingProcess from './InsurancePurchasingProcess';
import DirectPaymentProcess from './DirectPaymentProcess';
import Account from './Account';
import InsurancePurchasingDetail from './InsurancePurchasingDetail';

export default {
    ...InsuranceListProcessor,
    ...InsurancePurchasingProcess,
    ...DirectPaymentProcess,
    ...Account,
    ...InsurancePurchasingDetail,
};