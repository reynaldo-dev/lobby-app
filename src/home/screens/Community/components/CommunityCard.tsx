import { Box, HStack, Heading, Stack, Text } from 'native-base';
import { ICommunity } from '../../../../interfaces/community.interface';
import { useGetCountMembersQuery } from '../../../../services/communities.service';
import CustomPressable from '../../../../shared/components/CustomPressable';

type Props = {
    community: ICommunity;
}

const CommunityCard = ({ community }: Props) => {
    const onPress = () => {
        console.log("navigate to community page")
    }

    const { data: communityData } = useGetCountMembersQuery(community.id);

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
                    <Box w={["100%", "100%", "40"]} h="100%" backgroundColor={community?.color}></Box>
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
        </CustomPressable>
    )
}
export default CommunityCard