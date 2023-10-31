import { Box, Text, VStack } from '@gluestack-ui/themed';
import { formatDate } from '../../helpers/date-format/DateFormat';
import { IAlliances } from '../../shared/interfaces/shared.interface';

interface AllianceCardProps {
     alliance: IAlliances;
}

export const AlliancesCard = ({ alliance }: AllianceCardProps) => {
     const { name, description, benefits, initialDate, endDate } = alliance;
     const formattedInitialDate = formatDate(initialDate);
     const formattedEndDate = formatDate(endDate);

     return (
          <Box
               backgroundColor="white"
               shadowColor="black"
               borderRadius={8}
               padding={4}
               marginVertical={2}
               width="90%"
               alignSelf="center"
          >
               <Text
                    fontWeight="bold"
                    sx={{
                         '@base': {
                              fontSize: 'lg',
                         },
                         '@sm': {
                              fontSize: 'xl',
                         },
                    }}
                    mb={2}
               >
                    {name}
               </Text>
               <Text color="gray.500" mb={2}>
                    {description}
               </Text>
               <Text color="gray.500" fontStyle="italic" mb={3}>
                    Válido desde {formattedInitialDate} hasta {formattedEndDate}
               </Text>
               <Box
                    bg="green.100"
                    borderRadius={'$md'}
                    p={3}
                    borderColor="green.500"
                    borderWidth={1}
                    mt={2}
               >
                    <Text color="green.700" fontWeight="bold" mb={2}>
                         Beneficios
                    </Text>
                    <VStack space="md">
                         {benefits.map((benefit, index) => (
                              <Box
                                   key={index}
                                   flexDirection="row"
                                   alignItems="center"
                                   maxWidth={'90%'}
                              >
                                   <Box
                                        bg="black"
                                        width={2}
                                        height={2}
                                        borderRadius="$full"
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
