import LottieView from 'lottie-react-native';
import { Center, Text } from "native-base";
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import notFound from '../../../../assets/notFound.json';
import { theme } from "../../../theme";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

type Props = {
    message: string;
    width?: number | string;
    height?: number | string;
}

export const NotFound = ({ message, width = "100%", height = 150 }: Props) => {

    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []);
    return (
        <Center>
            <AnimatedLottieView
                source={notFound}
                progress={animationProgress.current}
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