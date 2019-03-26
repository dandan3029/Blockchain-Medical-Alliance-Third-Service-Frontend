export const INSURANCE_PURCHASING_STAGE_ID = {
    ALL_STAGES: Symbol('allStages'), // 所有状态，开发用
    APPLICATION: 0, // 投保人申请
    INSURANCE_COMPANY_VERIFY: 1,      // 保险公司审核
    PAY: 2,         // 投保人缴费，保险公司确认并发布保单
    COMPLETE: 3,    // 完成
};

export const INSURANCE_PURCHASING_STAGE_ID_TO_TEXT = {
    [INSURANCE_PURCHASING_STAGE_ID.ALL_STAGES]: '全部',
    [INSURANCE_PURCHASING_STAGE_ID.APPLICATION]: '投保人已申请', // 投保人申请
    [INSURANCE_PURCHASING_STAGE_ID.INSURANCE_COMPANY_VERIFY]: '等待公司审核',      // 保险公司审核
    [INSURANCE_PURCHASING_STAGE_ID.PAY]: '待投保人缴费',         // 投保人缴费，保险公司确认并发布保单
    [INSURANCE_PURCHASING_STAGE_ID.COMPLETE]: '已完成',    // 完成

    // 为了进度组件取 Label 方便，增加迭代器跳过 -1
    [Symbol.iterator]: function* ()
    {
        for (let i = 0; i < Object.keys(INSURANCE_PURCHASING_STAGE_ID).length - 1; i++)
        {
            yield this[i];
        }
    },
};