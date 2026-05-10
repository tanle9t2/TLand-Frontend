import { AUTH_REQUEST } from "../utils/axiosConfig";

export async function initPaymentUrl({ txnRef, purposeType, transactionType }) {
    const res = await AUTH_REQUEST.post(`/payment-service/api/v1/payment-url`, {
        txnRef, purposeType, transactionType
    });
    return res.data;
}