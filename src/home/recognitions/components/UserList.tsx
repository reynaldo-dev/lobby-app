import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Avatar,
    Box,
    Center,
    FlatList,
    HStack,
    Pressable,
    Spacer,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import avatarImage from "../../../../assets/avatar.png";
import { User } from '../../../redux/slices/user/user.interface';
import { RootState, useAppSelector } from '../../../redux/store/store';
import { RootStackParamList } from '../../../routing/navigation-types';

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {

    const currentUser = useAppSelector((state: RootState) => state.user);
    const filteredUsers = users.filter(u => u.id !== currentUser.user?.id);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Recognitions'>>();

    const onPress = (selectedUser: User) => {
        navigation.navigate("SendRecognition", { user: selectedUser });
    };

    const renderItem = ({ item: user }: { item: User }) => {
        return (
            <Box key={user.id}>
                <Pressable onPress={() => onPress(user)}>
                    {({ isPressed }) => (
                        <VStack
                            pl="4"
                            py="3"
                            space={5}
                            style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
                        >
                            <HStack alignItems="center" space={2}>
                                <Avatar size="48px" source={user.picture ? { uri: user.picture } : avatarImage} />
                                <VStack>
                                    <Text bold textTransform={"capitalize"}>{user.name} {user.lastname}</Text>
                                    <Text textTransform={"capitalize"}>{user?.rol?.role}</Text>
                                </VStack>
                                <Spacer />
                            </HStack>
                        </VStack>
                    )}
                </Pressable>
            </Box>
        );
    };

    return (
        <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(user) => user.id.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <Center flex={1} >
                    <Text fontSize="lg" fontWeight="bold">Busca usuarios para reconocerlos</Text>
                </Center>
            }
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: users.length === 0 ? 'center' : 'flex-start'
            }}
        />
    );
}

export default UserList;
