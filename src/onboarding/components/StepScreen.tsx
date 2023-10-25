import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Box, Button, Center, HStack, Text, View, ZStack, useBreakpointValue } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import RigthArrow from "../../../assets/right-arrow.svg";
import StepContainer from "../../../assets/step-number-container.svg";
import { RootStackParamList } from "../../routing/navigation-types";
import Layout from "../../shared/layout/Layout";
import { theme } from "../../theme";

type StepScreenProps = {
    stepNumber: number;
    stepTitle: string;
    stepImage: any;
    nextStep: any;
    continueButtonText?: string;
    showBackButton?: boolean;
}

const StepScreen: React.FC<StepScreenProps> = ({
    stepNumber,
    stepTitle,
    stepImage,
    nextStep,
    continueButtonText = "Continuar",
    showBackButton = true
}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const ScreenWidth = Dimensions.get("window").width * 0.8
    const ScreenHeight = Dimensions.get("window").height * 0.5

    const onPressContinue = () => {
        navigation.navigate(nextStep);
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const iconResponsive = useBreakpointValue({
        base: 40,
        sm: 45,
        md: 70,
        lg: 80,
    });

    const topResponsive = useBreakpointValue({
        base: -20,
        sm: -25,
        md: -25,
        lg: -40,
    });

    const leftResponsive = useBreakpointValue({
        base: 2,
        sm: -2,
        md: 6,
        lg: 8,
    });

    const arrowResponsive = useBreakpointValue({
        base: 15,
        sm: 15,
        md: 20,
        lg: 25,
    });

    return (
        <Layout backgroundColor={theme.colors.white} >
            <View justifyContent="space-around" flex={1}>
                <Center>
                    {React.cloneElement(stepImage, { width: ScreenWidth, height: ScreenHeight })}
                </Center>

                <ZStack
                    backgroundColor={theme.colors.background}
                    borderRadius="full"
                    padding={10}
                    alignSelf="center"
                    width={{ base: "90%", md: "80%" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <StepContainer
                        position="absolute"
                        top={topResponsive}
                        left={-10}
                        width={iconResponsive}
                        height={iconResponsive}
                    />
                    <Text
                        position="absolute"
                        top={-12}
                        left={leftResponsive}
                        fontSize={{
                            base: 'lg',
                            sm: 'md',
                            md: '3xl',
                            lg: 'xl',
                        }}
                        fontWeight="bold"
                        color={theme.colors.white}
                    >
                        {stepNumber}
                    </Text>
                    <Text
                        textAlign="center"
                        fontSize={{
                            base: 'lg',
                            sm: 'md',
                            md: '3xl',
                            lg: 'xl',
                        }}
                        fontWeight="bold"
                        color={theme.colors.primary}
                    >
                        {stepTitle}
                    </Text>
                </ZStack>


                <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    width={"90%"}
                    alignSelf="center"
                    mx={4}
                >
                    {showBackButton ? (
                        <Button
                            onPress={onPressBack}
                            variant="outline"
                            borderRadius={"full"}
                            borderColor={theme.colors.primary}
                        >
                            <Text color={theme.colors.primary}>Volver</Text>
                        </Button>
                    ) : (
                        <Box width={"30%"} />
                    )}
                    <Button
                        onPress={onPressContinue}
                        borderRadius={"full"}
                        backgroundColor={theme.colors.primary}
                        w={{ base: "40%", md: "30%" }}
                    >
                        <HStack space={2} alignItems="center" >
                            <Text
                                color={theme.colors.white}
                                fontSize={{
                                    base: 'md',
                                    sm: 'md',
                                    md: '2xl',
                                    lg: '3xl',
                                }}
                            >
                                {continueButtonText}
                            </Text>
                            <RigthArrow width={arrowResponsive} height={arrowResponsive} />
                        </HStack>
                    </Button>
                </Box>
            </View>
        </Layout >
    );
};

export default StepScreen;
