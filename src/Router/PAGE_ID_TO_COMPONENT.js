import REQUIRE_LOGIN_PAGE_ID from '../Config/ROUTE/REQUIRE_LOGIN_PAGE_ID';
import NOT_REQUIRE_LOGIN_PAGE_ID from '../Config/ROUTE/NOT_REQUIRE_LOGIN_PAGE_ID';
// 页面 View 从此导入
import {View as InsuranceList} from '../Pages/InsuranceList';
import {View as InsurancePublication} from '../Pages/InsurancePublication';
import {View as PersonalCenter} from '../Pages/PersonalCenter';
import {View as InsurancePurchasingProcess} from '../Pages/InsurancePurchasingProcess';
import {View as DirectPaymentProcess} from '../Pages/DirectPaymentProcess';
import {View as Login} from '../Pages/Login';
import {View as SignUp} from '../Pages/SignUp';
import {View as InsurancePurchasingDetail} from '../Pages/InsurancePurchasingDetail';
import {View as DirectPaymentDetail} from '../Pages/DirectPaymentDetail';

// 页面对应的组件
export default {
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_LIST]: InsuranceList,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PUBLICATION]: InsurancePublication,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_PROCESS]: DirectPaymentProcess,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_DIRECT_PAYMENT_DETAIL]: DirectPaymentDetail,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_PROCESS]: InsurancePurchasingProcess,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_PURCHASING_DETAIL]: InsurancePurchasingDetail,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_PERSONAL_CENTER]: PersonalCenter,
    [REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_INSURANCE_DETAIL]: null,
    [NOT_REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_LOGIN]: Login,
    [NOT_REQUIRE_LOGIN_PAGE_ID.THIRD_PARTY_SIGN_UP]: SignUp,
};