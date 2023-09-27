import React from 'react';
import {
    Box, Pressable, HStack, Avatar, VStack, Text, Spacer, FlatList, useTheme, Center
} from 'native-base';
import { User } from '../../../redux/slices/user/user.interface';
import avatarImage from "../../../../assets/avatar.png";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routing/navigation-types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState, useAppSelector } from '../../../redux/store/store';

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
                                <Avatar size="48px" source={avatarImage} />
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
