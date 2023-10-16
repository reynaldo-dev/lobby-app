import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VStack } from 'native-base';
import React, { useState } from 'react';
import { RootStackParamList } from '../../../routing/navigation-types';
import RecognitionFilter from './RecognitionFilter';
import RecognitionList from './RecognitionList';

type MyRecognitionsScreenProps = NativeStackScreenProps<RootStackParamList, 'MyRecognitions'>;

const MyRecognitions = ({ route }: MyRecognitionsScreenProps) => {
    const [filter, setFilter] = useState<'received' | 'given'>('received');

    return (
        <VStack space={4} flex={1} mt={4}>
            <RecognitionFilter currentFilter={filter} onChange={setFilter} />
            <RecognitionList type={filter} />
        </VStack>
    );
}

export default MyRecognitions;


