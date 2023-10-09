import LottieView from 'lottie-react-native';
import { Center, Text } from "native-base";
import React from 'react';
import notFound from '../../../../assets/notFound.json';
import { theme } from "../../../theme";


type Props = {
    message: string;
    width?: number | string;
    height?: number | string;
}

export const NotFound = ({ message, width = "100%", height = 150 }: Props) => {

    return (
        <Center my={"auto"}>
            <LottieView
                source={notFound}
                autoPlay={true}
                loop={true}
                style={{
                    width: width,
                    height: height,
                }}
            />
            <Text color={theme.colors.muted[400]}>
                {message}
            </Text>
        </Center>
    )
}