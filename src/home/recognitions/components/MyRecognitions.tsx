import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Center, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { RootState, useAppSelector } from '../../../redux/store/store';
import { RootStackParamList } from '../../../routing/navigation-types';
import Layout from '../../../shared/layout/Layout';
import RecognitionFilter from './RecognitionFilter';
import RecognitionList from './RecognitionList';

type MyRecognitionsScreenProps = NativeStackScreenProps<RootStackParamList, 'MyRecognitions'>;

const MyRecognitions: React.FC<MyRecognitionsScreenProps> = ({ route }) => {
    const [filter, setFilter] = useState<'all' | 'received' | 'given'>('all');
    const { user } = useAppSelector((state: RootState) => state.user);
    const { recognitions } = route.params;

    const navigation = useNavigation();

    const filteredRecognitions = recognitions.filter(recognition => {
        if (filter === 'received') return recognition.userTargetId === user?.id;
        if (filter === 'given') return recognition.userSourceId === user?.id;
        return true;
    });

    return (
        <Layout>
            <Box flexDirection="row" alignItems="center" ml={2} height={50}>
                <Box>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                </Box>
                <Center flex={1}>
                    <Text fontSize={16} color={"muted.500"} fontWeight="bold" marginRight={10}>
                        Mis reconocimientos
                    </Text>
                </Center>
            </Box>
            <VStack space={4}>
                <RecognitionFilter currentFilter={filter} onChange={setFilter} />
                <RecognitionList recognitions={filteredRecognitions} type={filter} />
            </VStack>
        </Layout>
    );
}

export default MyRecognitions;
