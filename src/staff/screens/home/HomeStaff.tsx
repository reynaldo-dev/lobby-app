import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text, VStack } from 'native-base';
import { RootStackParamList } from '../../../routing/navigation-types';
import Layout from '../../../shared/layout/Layout';


//TODO: responsive
export const HomeStaff = () => {
     const navigation =
          useNavigation<
               NavigationProp<RootStackParamList, 'BarScannerStaff'>
          >();
     const onPress = () => {
          navigation.navigate('BarScannerStaff');
     };
     return (
          <Layout>
               <VStack space={4} alignItems="center" padding={5}>
                    <Text fontSize="2xl">Escaneo de Códigos QR</Text>
                    <Text textAlign={'center'}>
                         Escanee los códigos QR para validar cupones de
                         consumibles.
                    </Text>
                    <Button
                         size="lg"
                         leftIcon={
                              <AntDesign name="scan1" size={24} color="black" />
                         }
                         onPress={onPress}
                    >
                         <Text>
                              Iniciar Escaneo
                         </Text>
                    </Button>
               </VStack>
          </Layout>
     );
};
