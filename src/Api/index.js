import InsuranceListProcessor from './InsuranceList';
import InsurancePurchasingProcess from './InsurancePurchasingProcess';
import DirectPaymentProcess from './DirectPaymentProcess';
import Account from './Account';
import InsurancePurchasingDetail from './InsurancePurchasingDetail';
import PersonalCenter from './PersonalCenter';

export default {
    ...InsuranceListProcessor,
    ...InsurancePurchasingProcess,
    ...DirectPaymentProcess,
    ...Account,
    ...InsurancePurchasingDetail,
    ...PersonalCenter,
};