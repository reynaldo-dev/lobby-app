import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { useGetEventQRByIdQuery } from "../../redux/services/events.service";
import { RootStackParamList } from "../../routing/navigation-types";
import { DetailScreen } from "./DetailScreen";

export const TicketAssistanceDetailScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "TicketAssistanceDetail">>();
  const { event, user, isActive, consumable } = route.params;

  const { data: qrCodeData, error } = useGetEventQRByIdQuery(event?.id);
  const qrData = JSON.stringify({
    qrCodeData,
  });

  return (
    <DetailScreen
      consumable={consumable}
      event={event}
      isActive={isActive}
      qrCodeData={qrData}
      user={user}
    />
  );
};
