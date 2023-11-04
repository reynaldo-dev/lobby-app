import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, HStack, Heading, Pressable, Text, VStack } from 'native-base';
import { usePartialDate } from '../../hooks/usePartialDate';
import { RootStackParamList } from '../../routing/navigation-types';
import { theme } from '../../theme';
import { IUpcomingEvents } from '../interfaces/upcoming-events';

interface CardEventProps {
     data: IUpcomingEvents;
}

const CardEvent = ({ data }: CardEventProps) => {
     const { day, month, year } = usePartialDate(data.dateTime);
     const navigation =
          useNavigation<NavigationProp<RootStackParamList, 'Event'>>();

     return (
          <Pressable
               onPress={() => navigation.navigate('Event', { id: data?.id })}
               backgroundColor={theme.colors.white}
               w="95%"
               alignSelf="center"
               borderRadius={10}
               p={4}
               marginBottom={4}
          >
               <HStack space={10}>
                    <VStack
                         alignItems="center"
                         space={1}
                         background={theme.colors.primary}
                         borderRadius={10}
                         width={{
                              base: '30%',
                              sm: '30%',
                              md: '20%',
                              lg: '20%',
                         }}
                    >
                         <Text color={theme.colors.white}>{month}</Text>
                         <Heading size="lg" color={theme.colors.white}>
                              {day}
                         </Heading>
                         <Text color={theme.colors.white}>{year}</Text>
                    </VStack>
                    <Box
                         justifyContent={'space-around'}
                         width={{
                              base: '60%',
                              sm: '60%',
                              md: '60%',
                              lg: '60%',
                         }}
                    >
                         <Text
                              bold
                              fontSize={{
                                   base: 'md',
                                   sm: 'md',
                                   md: 'xl',
                                   lg: 'md',
                              }}
                         >
                              {data?.title}
                         </Text>

                         <HStack space={2}>
                              <Text
                                   fontSize={{
                                        base: 'sm',
                                        sm: 'sm',
                                        md: 'md',
                                        lg: 'md',
                                   }}
                              >
                                   {data?.community.name}
                              </Text>
                              <Feather name="users" size={16} />
                         </HStack>
                    </Box>
               </HStack>
          </Pressable>
     );
};

export default CardEvent;
