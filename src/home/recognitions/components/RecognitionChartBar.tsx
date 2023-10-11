import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Layout from '../../../shared/layout/Layout';
import { useFindByRecognitionsCategoryQuery } from '../../../redux/services/recognitions/recognitions.service';
import { RootState, useAppSelector } from '../../../redux/store/store';
import { Center, ScrollView, Spinner } from 'native-base';

const RecognitionChartBar = () => {

    const { user } = useAppSelector((state: RootState) => state.user);
    const { data: recognitionHistory, isError, isLoading, error } = useFindByRecognitionsCategoryQuery({ id: user?.id as string });
    console.log(error, "error")

    if (isLoading) {
        return (
            <Center flex={1}>
                <Spinner />
            </Center>
        )
    }

    if (isError || !recognitionHistory) {
        return <Text>Error al cargar la data.</Text>;
    }
    const maxValue = 100;

    return (
        <Layout showCredits={false}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {recognitionHistory.map((item, index) => {
                        const category = item.category.name;
                        const value = item.total;

                        return (
                            <View key={index} style={styles.itemContainer}>
                                <Text style={{ fontSize: 18 }}>{category}</Text>
                                <View style={styles.progressBarContainer}>
                                    <View style={{ ...styles.progressBar, width: `${(value / maxValue) * 100}%` }} />
                                    <View style={styles.labelContainer}>
                                        <Text style={styles.labelText}>{value}/{maxValue}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    progressBarContainer: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        position: 'relative',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#000',
    },
    labelContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    labelText: {
        color: '#000',
    },
});

export default RecognitionChartBar;