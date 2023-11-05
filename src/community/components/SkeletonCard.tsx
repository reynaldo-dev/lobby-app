import { Center, HStack, Skeleton, VStack } from 'native-base';

export const SkeletonCard = () => {
     return (
          <HStack space={2}>
               <SingleSkeletonCard />
               <SingleSkeletonCard />
          </HStack>
     );
};

const SingleSkeletonCard = () => {
     return (
          <Center w={['48', '48', '4/6']} h={['48', '48', '48']} mt={4}>
               <VStack
                    w={['48', '48', '4/6']}
                    h={['48', '48', '48']}
                    maxW="300"
                    borderWidth="1"
                    space={8}
                    overflow="hidden"
                    rounded="md"
               >
                    <Skeleton h="20%" />
                    <Skeleton.Text mt="4" px="4" />
                    <Skeleton mt="4" h="30%" rounded="md" />
               </VStack>
          </Center>
     );
};
