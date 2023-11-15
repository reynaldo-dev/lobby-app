import { Center, Spinner } from "native-base"
import { theme } from "../../../theme"

export const CustomSpinner = () => {
    return (
        <Center flex={1}>
            <Spinner color={theme.colors.primary} size={"lg"}
                accessibilityLabel="Cargando..."
            />
        </Center>
    )
}