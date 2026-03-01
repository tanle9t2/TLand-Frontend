import { useMutation } from "@tanstack/react-query"
import { predictHouse as predictHouseAPI } from "../../services/ChatbotService"
export default function usePredictHouse() {
    const { isPending, mutate: predictHouse } = useMutation({
        mutationFn: ({
            area,
            floors,
            bedrooms,
            bathrooms,
            propertyType,
            propertyFeature,
            legalStatus,
            furnitureState,
            address,
            year,
        }) => predictHouseAPI({
            area,
            floors,
            bedrooms,
            bathrooms,
            propertyType,
            propertyFeature,
            legalStatus,
            furnitureState,
            address,
            year,
        }),
    })

    return { isPending, predictHouse }
}