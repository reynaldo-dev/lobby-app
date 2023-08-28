import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../routing/navigation-types";
import { DetailScreen } from "./components/DetailScreen";

export const TicketConsumableDetailScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'TicketConsumableDetail'>>();
    const { event, user, isActive, consumable, ticketId, userId } = route.params;
    const qrCodeData = {
        name: consumable?.name,
        isActive: isActive,
        userName: user?.name,
        ticketId,
        userId
    }

    const qrData = JSON.stringify({
        qrCodeData
    });

    return (
        <DetailScreen
            consumable={consumable}
            event={event}
            isActive={isActive}
            qrCodeData={qrData}
            user={user}
        />
    )
}