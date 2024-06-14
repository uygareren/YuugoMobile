import { FlatList, Image, Pressable, Text, View } from "native-base"
import { RootStateType } from "../../../store/store";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import { Button } from "../../../components/Button";
import { useState } from "react";

const avatars = [
    {
        "id": 1,
        "name": "Gojo Sensei",
        "image": "https://i.pinimg.com/736x/eb/ee/0e/ebee0e3868e2796ae450fcf85184dbaf.jpg"
    },
    {
        "id": 2,
        "name": "Breakfast",
        "image": "https://i.pinimg.com/236x/40/a2/7c/40a27c0c9e01732bec6b25829eaa0722.jpg"
    },
    {
        "id": 3,
        "name": "Astronout",
        "image": "https://i.pinimg.com/736x/45/9a/92/459a92215ae8930097d82facb1163a5d.jpg"
    },
    {
        "id": 4,
        "name": "Manga Girl",
        "image": "https://i.pinimg.com/736x/2d/f5/45/2df54523d61b99b9223ea653c8ec75e3.jpg"
    },
    {
        "id": 5,
        "name": "Cat Girl",
        "image": "https://i.pinimg.com/236x/b2/7f/0e/b27f0e466185ac66a461551f09aaa925.jpg"
    },
    {
        "id": 6,
        "name": "Family",
        "image": "https://i.pinimg.com/236x/75/26/64/7526641fa122966e80c3becdc8407abf.jpg"
    },
    {
        "id": 7,
        "name": "Artis Poetic",
        "image": "https://i.pinimg.com/236x/df/1d/34/df1d34be7c7fd46c44cbf6750aebde55.jpg"
    },
    {
        "id": 8,
        "name": "Boslar Krali",
        "image": "https://i.pinimg.com/236x/44/f2/d8/44f2d8ce7f9c687ea6d3bbb19cb75123.jpg"
    },
    {
        "id": 9,
        "name": "Souless Bastard",
        "image": "https://i.pinimg.com/236x/bd/06/94/bd069482a65959fc95c3f579b4883c13.jpg"
    },
    {
        "id": 10,
        "name": "Kawai koto",
        "image": "https://i.pinimg.com/236x/13/a5/ed/13a5ed47d50fc8b89981c13685353152.jpg"
    }
]

type StepperAvatarProps = {
    onNext: () => void
} 
export const StepperAvatar = ({ onNext }: StepperAvatarProps) => {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const maxW = Dimensions.get("screen").width;
    const [selected, setSelected] = useState(null); 

    const Avatar = ({ image }: any) => {
        const size = (maxW * 0.33 - 21) + "px";

        return (
            <Pressable onPress={() => setSelected(image)} opacity={selected == image ? 0.7 : 1}>
                <Image borderWidth="2px" borderColor={selected == image ? "primary.500" : "white"}
                borderRadius="50px" source={{uri: image}} w={size} height={size} alt="asd" />
            </Pressable>
        )
    }

    return (
        <View mx="16px" flex={1}>
            <FlatList 
                numColumns={3}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ gap: 16, marginBottom: 16 }}
                data={avatars}
                renderItem={({item, index}) => <Avatar image={item.image} />}
            />

            <Button title="Devam Et" onPress={onNext} mb="16px" isActive />
        </View>
    )
}