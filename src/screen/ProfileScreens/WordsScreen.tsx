import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { Actionsheet, FlatList, Icon, Pressable, ScrollView, Text, View, useDisclose } from "native-base";
import { SvgUri } from "react-native-svg";
import { useI18n } from "../../hooks/useI18n";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { wordSliceActions } from "../../store/slices/wordSlice";

export default function WordsScreen() {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const i18nFlags = useI18n("language");
    const {t} = useI18n("WordScreen");
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const words = useSelector<RootStateType, any[]>(state => state.word.words);

    const [loading, setLoading] = useState(true);
    const [selectedWord, setSelectedWord] = useState(0);
    const { isOpen, onClose, onOpen } = useDisclose();

    useEffect(() => {
        getWords();
    }, []);

    async function getWords() {
        try {
            const resp = await api.get("/word", {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            const data = resp.data.data;
            
            dispatch(wordSliceActions.setWords(data));

            setLoading(false);

        } catch (error) {
            
        }
    }

    function handleSelectWord(id: number) {
        onOpen()
        setSelectedWord(id);
    }

    function handleDeleteWord() {
        try {
            api.delete("/word", {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            dispatch(wordSliceActions.removeWord(selectedWord));
        } catch (error) {
            
        }
    }

    function handleEditWord() {
        onClose();
        navigation.navigate("EditWord", { id: selectedWord });
    }

    const ListWord = ({ id, mainText, translatedText, createdDate, translatedLanguageId, mainLanguageName,
        translatedLanguageName, mainLanguageImage, translatedLanguageImage }: any) => {

        return (
            <Pressable bgColor="primary.400"  mx="16px" onPress={() => handleSelectWord(id)}
            p="16px" borderRadius="10px">
                <Text color="white" fontSize="17px" fontWeight="bold">{mainText}</Text>
                <Text color="white" fontSize="14.3px">{translatedText}</Text>
                <View flexDir="row" mt="12px">
                    <View flexDir="row" alignItems="center" mr="16px">
                        <SvgUri uri={mainLanguageImage} width="24" height="24"  />
                        <Text ml="8px" color="#fff">{i18nFlags.t(mainLanguageName)}</Text>
                    </View>
                    <View flexDir="row" alignItems="center" >
                        <SvgUri uri={translatedLanguageImage} width="24" height="24"  />
                        <Text ml="8px" color="#fff">{i18nFlags.t(translatedLanguageName)}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View mt="16px">
                <Header title={t("title")} />
            </View>
            <ScrollView>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={words}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({item, index}) => (<ListWord {...item} />)}
                    contentContainerStyle={{ rowGap: 20, marginTop: 24 }}
                />

            </ScrollView>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={handleEditWord}>{t("edit")}</Actionsheet.Item>
                    <Actionsheet.Item onPress={handleDeleteWord}>
                        <View flexDir="row" alignItems="center">
                            <Icon as={<FontAwesome5Icon name="trash" />} mr="4px" color="red.500" size="20px" />
                            <Text color="red.500" fontSize="17px">{t("delete")}</Text>
                        </View>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listWordContainer: {
        paddingHorizontal: 7,
        paddingVertical: 9,
        borderRadius: 8,
        maxWidth: "60%"
    },
    buttonRemove: {
        borderWidth: 1,
        borderBottomWidth: 6,
        borderColor: "#db37ce",
        borderRadius: 8,
    }
})