import { Text, View } from "native-base"
import { SearchBar } from "../../../shared/components/SearchBar"

export const Community = () => {
    return (
        <View>
            <SearchBar route="communities" />
        </View>
    )
}