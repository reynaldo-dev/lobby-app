import { Stack, Box, Image, Center, Heading, Text, HStack } from "native-base";
import { IRedeemable } from "../../../../redux/services/alliances/interfaces/reedemable.interface";
import giftImage from "../../../../../assets/gift.png";


interface RedeemableCardProps {
    redeemable: IRedeemable;
}

const RedeemableCard: React.FC<RedeemableCardProps> = ({ redeemable }) => {
    return (
        <Center>
            <Stack
                direction={["column", "column", "row"]}
                rounded="lg"
                overflow="hidden"
                width={"95%"}
                height={["96", "96", "48"]}
                shadow="1"
                _light={{ backgroundColor: "coolGray.50" }}
                _dark={{ backgroundColor: "gray.700" }}
                marginBottom={4}
            >
                <Box w={["100%", "100%", "40"]} h={["50%", "50%", "48"]} shadow={"2"}>
                    <Image
                        w={["100%", "100%", "40"]}
                        h="100%"
                        source={redeemable.picture ? { uri: redeemable.picture } : giftImage}
                        alt={redeemable.name}
                    />
                    <Center
                        bg="secondary"
                        _text={{ color: "white", fontWeight: "700", fontSize: "xs" }}
                        position="absolute"
                        bottom="0"
                        px="3"
                        py="1.5"
                    >
                        {`${redeemable.token.name}s requeridos: ${redeemable.required_token_amount}`}
                    </Center>
                </Box>
                <Stack flex="1" p="4" space={[3, 3, 1.5]} justifyContent="space-around">
                    <Stack space="2">
                        <Heading size="md" ml="-1">
                            {redeemable.name}
                        </Heading>
                    </Stack>
                    <Text fontWeight="400">
                        {redeemable.description}
                    </Text>
                    <HStack alignItems="center" space="4" justifyContent="space-between">
                        <Text
                            fontWeight="400"
                            color={"primary"}
                        >
                            {`Cantidad disponible: ${redeemable.stock}`}
                        </Text>
                    </HStack>
                </Stack>
            </Stack>
        </Center>
    );
}

export default RedeemableCard;
