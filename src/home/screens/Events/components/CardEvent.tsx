import { Box, Button, Center, HStack, Heading, VStack, Spacer, Stack, Text } from 'native-base';

type DimensionProp = number | string | (number | string)[];
type Props = {
    widthCard: DimensionProp;
    heightCard: DimensionProp;
    marginTop?: number;
    marginRight?: number;
};

const CardEvent = ({ widthCard, heightCard, marginTop = 0, marginRight = 0 }: Props) => {

    const handleMoreInfoPress = () => {
        console.log("navigate to more info page")
    }

    return (
        <Box
            style={{
                marginRight: marginRight,
                marginTop: marginTop,
            }}
            width={widthCard}
            height={heightCard}
        >
            <Stack
                direction={"column"}
                rounded="lg"
                alignSelf="center"
                overflow="hidden"
                width={widthCard}
                height={heightCard}
                shadow="1"
                backgroundColor="coolGray.50"
                position="relative"
            >
                <Box w={"5%"} h={"100%"} position={"absolute"} left={0} backgroundColor={"#0000FF"}></Box>
                <VStack p="4" space={[3, 3, 1.5]} ml="10%">
                    <Heading size="md" ml="-1">
                        Tarde de peliculas
                    </Heading>
                    <Box>
                        <Text fontWeight="400" numberOfLines={2} mb={1}>
                            Tarde de peliculas de terror de los años 80
                        </Text>
                        <HStack justifyContent="space-between">
                            <Text>
                                Lugar: Davivienda
                            </Text>
                            <Text>
                                Hora: 4:00 p.m
                            </Text>
                        </HStack>
                    </Box>
                    <Center>
                        <Button onPress={handleMoreInfoPress} size="md" w={'full'} colorScheme="blue" variant={"outline"}>
                            Ver más información
                        </Button>
                    </Center>
                </VStack>
            </Stack>
        </Box>
    )
}

export default CardEvent;
