export const DIRECT_PAYMENT_STAGE_ID = {
    ALL_STAGES: Symbol('allStages'),                         // 所有状态，开发用
    APPLICATION: 0,                         // 投保人申请
    HOSPITAL_CONFIRM_PAYABLE: 1,            // 待医院确认是否可以直付
    INSURANCE_COMPANY_VERIFY_AND_PAY: 2,    // 待保险公司审核及支付
    HOSPITAL_CONFIRM_PAYMENT: 3,            // 医院已确认收款
    COMPLETE: 4,                            // 完成
};

export const DIRECT_PAYMENT_STAGE_ID_TO_TEXT = {
    [DIRECT_PAYMENT_STAGE_ID.ALL_STAGES]: '全部',
    [DIRECT_PAYMENT_STAGE_ID.APPLICATION]: '投保人已申请',
    [DIRECT_PAYMENT_STAGE_ID.HOSPITAL_CONFIRM_PAYABLE]: '医院确认直付',
    [DIRECT_PAYMENT_STAGE_ID.INSURANCE_COMPANY_VERIFY_AND_PAY]: '公司审核付款',
    [DIRECT_PAYMENT_STAGE_ID.HOSPITAL_CONFIRM_PAYMENT]: '医院确认收款',
    [DIRECT_PAYMENT_STAGE_ID.COMPLETE]: '已完成',

    // 为了进度组件取 Label 方便，增加迭代器跳过 -1
    [Symbol.iterator]: function* ()
    {
        for (let i = 0; i < Object.keys(DIRECT_PAYMENT_STAGE_ID).length - 1; i++)
        {
            yield this[i];
        }
    },
};