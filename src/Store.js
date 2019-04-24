import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
// import 所有 Reducer
import {Reducer as InsurancePurchasingProcessReducer} from './Pages/InsurancePurchasingProcess';
import {Reducer as DirectPaymentProcessReducer} from './Pages/DirectPaymentProcess';
import {Reducer as AuthProcessorReducer} from './Components/AuthProcessor';
import {Reducer as DirectPaymentDetailReducer} from './Pages/DirectPaymentDetail';
import {INSURANCE_PURCHASING_STAGE_ID, DIRECT_PAYMENT_STAGE_ID, INSURANCE_COMPANY} from './Constant';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    InsurancePurchasingProcess: {
        companyName: INSURANCE_COMPANY.ALL_INSURANCE_COMPANY,     // 筛选器保险公司
        insurancePeriodRange: [Number.MIN_VALUE, Number.MAX_VALUE], // 筛选器保期范围
    },
    DirectPaymentProcess: {
        directPaymentMoneyAmountRange: [Number.MIN_VALUE, Number.MAX_VALUE], // 筛选器直付金额范围
        stageId: DIRECT_PAYMENT_STAGE_ID.DEVELOPMENT.ALL_STAGES,              // 筛选器阶段
    },
    AuthProcessor: {
        hasLoggedIn: false,
        email: '',
    },
    DirectPaymentDetail:{
        directPaymentInfo:{

        }
    }
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares),
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    InsurancePurchasingProcess: InsurancePurchasingProcessReducer,
    DirectPaymentProcess: DirectPaymentProcessReducer,
    AuthProcessor: AuthProcessorReducer,
    DirectPaymentDetail: DirectPaymentDetailReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);