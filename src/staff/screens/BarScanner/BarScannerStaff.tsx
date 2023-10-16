import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useRedeemTicketMutation } from "../../../redux/services/consumableTicket.service";
import { RootState, useAppSelector } from "../../../redux/store/store";
import { PrivateStackParamList } from "../../../routing/navigation-types";
import { CustomBarScanner } from "../../../shared/components/BarScanner/CustomBarScanner";

export const BarScannerStaff = () => {
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<PrivateStackParamList, "Home">>();
  const { user } = useAppSelector((state: RootState) => state.user);

  const [scanQRCode, { isLoading, error: errorData }] =
    useRedeemTicketMutation();

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    try {
      setScanned(true);

      const { qrCodeData } = JSON.parse(data);

      const response = await scanQRCode({
        ticketId: qrCodeData.ticketId,
        consumedById: qrCodeData.userId,
      });
      if ("data" in response) {
        if (response.data.status === "success") {
          alert(response?.data?.message);
        }
      } else if ("error" in response) {
        alert(
          "El usuario no tiene un boleto válido para este código QR o ya ha sido canjeado."
        );
      }
    } catch (error) {
      alert("Ha ocurrido un error al escanear el código QR.");
    }
  };

  return (
    <CustomBarScanner
      isLoading={isLoading}
      onBarCodeScanned={handleBarCodeScanned}
      navigation={navigation}
      scanned={scanned}
      setScanned={setScanned}
    />
  );
};
