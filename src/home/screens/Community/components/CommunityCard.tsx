import { Box, HStack, Heading, Pressable, Stack, Text } from 'native-base';
import { ICommunity } from '../../../../interfaces/community.interface';
import { useGetCountMembersQuery } from '../../../../services/communities.service';

type DimensionProp = number | string | (number | string)[];
type Props = {
    community: ICommunity;
    widthCard: DimensionProp;
    heightCard: DimensionProp;
    marginTop?: number;
    marginRight?: number;
};

const CommunityCard = ({ community, widthCard, heightCard, marginTop = 0, marginRight = 0 }: Props) => {

    const onPress = () => {
        console.log("navigate to community page")
    }

    const { data: communityData } = useGetCountMembersQuery(community.id);

    return (
        <Pressable onPress={onPress}>
            {({ isPressed }) => (
                <Box
                    style={{
                        marginRight: marginRight,
                        marginBottom: marginTop,
                        marginTop: marginTop,
                        transform: [{ scale: isPressed ? 0.96 : 1 }],
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
                    >
                        <Box w={"100%"} h={"20%"}>
                            <Box w={"100%"} h="100%" backgroundColor={community?.color}></Box>
                        </Box>
                        <Stack p="4" space={[3, 3, 1.5]} justifyContent="space-around">
                            <Stack>
                                <Heading size="md" ml="-1">
                                    {community?.name}
                                </Heading>
                            </Stack>
                            <Text fontWeight="400">
                                {community?.description}
                            </Text>
                            <HStack alignItems="center" justifyContent="flex-end">
                                <Box
                                    bgColor={community?.color}
                                    p={2.5}
                                    rounded={"full"}
                                >
                                    {
                                        communityData?.totalMembers === 0
                                            ?
                                            <Text color="white" fontSize="xs" fontWeight="bold">
                                                Aún no hay miembros
                                            </Text>
                                            :
                                            <Text color="white" fontSize="xs" fontWeight="bold">
                                                {communityData?.totalMembers} miembros
                                            </Text>
                                    }
                                </Box>
                            </HStack>
                        </Stack>
                    </Stack>
                </Box>
            )}
        </Pressable>
    )
}

export default CommunityCard;
