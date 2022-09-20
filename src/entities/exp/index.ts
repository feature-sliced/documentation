import cookies from "js-cookie";

/**
 * Inner lib for silent deployment of new features
 * @remark For example - for "checking on production", before global deployment
 * @module
 */

const EXP_COOKIE_KEY = "exp_flag";

/**
 * @ticket FEEDBACK-309
 */
export const DOC_FEEDBACK_WIDGET = "doc_feedback_widget";

export const hasExp = (expFlag: string) => {
    return cookies.get(EXP_COOKIE_KEY, expFlag);
};
