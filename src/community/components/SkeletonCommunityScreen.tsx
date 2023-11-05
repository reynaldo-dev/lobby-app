import { Skeleton } from 'native-base';
import React from 'react';
import { theme } from '../../theme';

export default function SkeletonCommunityScreen() {
     return (
          <>
               <Skeleton h={200} w="100%" />
               <Skeleton.Text lines={2} mt={2} ml={5} w="80%" />
               <Skeleton mt={10} h={200} w="100%" />
               <Skeleton.Text lines={2} mt={2} ml={5} w="80%" />
          </>
     );
}
