import { Box, HStack, Heading, Stack, Text } from 'native-base';
import CustomPressable from './CustomPressable';

const onPress = () => {
    console.log("navigate to community page")
}

const CommunityCard = () => {
    return (
        <CustomPressable widthCard={["80", "80", "4/6"]} heightCard={["40", "48", "48"]} onPress={onPress}>
            <Stack
                direction={["column", "column", "row"]}
                rounded="lg"
                alignSelf="center"
                overflow="hidden"
                width={["80", "80", "4/6"]}
                height={["48", "48", "48"]}
                shadow="1"
                backgroundColor="coolGray.50"
            >
                <Box w={["100%", "100%", "40"]} h={["20%", "30%", "30"]}>
                    <Box w={["100%", "100%", "40"]} h="100%" backgroundColor="#000"></Box>
                </Box>
                <Stack p="4" space={[3, 3, 1.5]} justifyContent="space-around">
                    <Stack>
                        <Heading size="md" ml="-1">
                            Runners
                        </Heading>
                    </Stack>
                    <Text fontWeight="400">
                        Grupo de corredores
                    </Text>
                    <HStack alignItems="center" justifyContent="flex-end">
                        <Box
                            bgColor={"#000"}
                            p={2.5}
                            rounded={"full"}
                        >
                            <Text color={"#fff"} fontSize={"sm"}>30 miembros</Text>
                        </Box>
                    </HStack>
                </Stack>
            </Stack>
        </CustomPressable>

    )
}
export default CommunityCard