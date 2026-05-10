import { useMutation, } from "@tanstack/react-query"

import { initPaymentUrl as initPaymentUrlAPI } from "../../services/PaymentService"
export default function useInitPaymentUrl() {
    const { isPending, mutate: initPaymentUrl } = useMutation({
        mutationFn: ({ txnRef, purposeType, transactionType }) => initPaymentUrlAPI({ txnRef, purposeType, transactionType }),
        onSuccess: (data) => {
            window.location.assign(data.vnpUrl);
        }
    })

    return { isPending, initPaymentUrl }
}