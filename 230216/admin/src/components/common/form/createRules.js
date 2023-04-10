/**
     * 生成表单规则
     */
export default function createRules(data) {
    data.forEach((el) => {
        const rules_array = [];
        if (el.required) {
            const rule = {
                required: true,
                message: el.message || createMsg(el),
            };
            rules_array.push(rule);
        }
        // 效验手机号
        if (el.value_type && el.value_type === "phone") {
            const reg = /^1[3456789]\d{9}$/;
            const vPhone = (rule, value, cb) =>
                reg.test(value) ? cb() : cb(new Error("请输入11位数字的手机号"));
            const rule = { validator: vPhone, trigger: "change" };
            rules_array.push(rule);
        }
        // 效验email

        // 检查是否有额外的效验规则
        if (el.rules && Array.isArray(el.rules) && el.rules.length > 0) {
            rules_array = rules_array.concat(el.rules);
        }
        el.rules = rules_array;
    });
    return data;
}


/**
 * 生成错误提示消息
 */
function createMsg(data) {
    let msg='';
    switch (data.type) {
        case "input":
            msg = "请输入";
            break;
        case "select":
            msg = "请选择";
            break;
    }
    return `${msg}${data.label}`;
}