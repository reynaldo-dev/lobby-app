import { Box, Text, VStack } from 'native-base';
import { formatDate } from '../../helpers/date-format/DateFormat';
import { IAlliances } from '../../shared/interfaces/shared.interface';
import { theme } from '../../theme';

interface AllianceCardProps {
     alliance: IAlliances;
}

export const AlliancesCard = ({ alliance }: AllianceCardProps) => {
     const { name, description, benefits, initialDate, endDate } = alliance;
     const formattedInitialDate = formatDate(initialDate);
     const formattedEndDate = formatDate(endDate);

     return (
          <Box
               bg={theme.colors.white}
               shadow={3}
               rounded="lg"
               p={4}
               my={3}
               width="90%"
               alignSelf="center"
          >
               <Text fontWeight="bold" fontSize="xl" mb={2}>
                    {name}
               </Text>
               <Text mb={2}>{description}</Text>
               <Text fontStyle="italic" mb={3}>
                    Válido desde {formattedInitialDate} hasta {formattedEndDate}
               </Text>
               <Box rounded="md" p={3} borderWidth={1} mt={2}
                    bg={theme.colors.green[200]}
               >
                    <Text fontWeight="bold" mb={2}>
                         Beneficios
                    </Text>
                    <VStack space={2}>
                         {benefits.map((benefit, index) => (
                              <Box
                                   key={index}
                                   flexDirection="row"
                                   alignItems="center"
                                   maxW={'90%'}
                              >
                                   <Box
                                        bg="black"
                                        width={2}
                                        height={2}
                                        borderRadius="full"
                                        marginRight={3}
                                   />
                                   <Text>{benefit}</Text>
                              </Box>
                         ))}
                    </VStack>
               </Box>
          </Box>
     );
};
