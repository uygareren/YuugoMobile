import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/react-navigation";
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { View, Text, Icon, Pressable, useDisclose, Actionsheet, FlatList, useToast } from "native-base";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { SvgUri } from "react-native-svg";
import { useI18n } from "../../hooks/useI18n";
import Entypo from 'react-native-vector-icons/Entypo';
import { TranslatedInput } from "../../components/input/TranslatedInput";
import { useGetLanguagesQuery } from "../../store/services/utilSerivce";
import SearchInput from "../../components/input/SearchInput";
import { Button } from "../../components/Button";
import { wordSliceActions } from "../../store/slices/wordSlice";

type EditWordScreenRouteProp = RouteProp<RootStackParamList, 'EditWord'>;

export default function EditWordScreen() {
    const { params } = useRoute<EditWordScreenRouteProp>();
    const wordId = params.id;

    const i18nFlags = useI18n("language");
    const {t} = useI18n("EditWord");
    const maxW = Dimensions.get("screen").width;
    const navigation = useNavigation<any>();
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const { data: languages } = useGetLanguagesQuery(null);
    const dispatch = useDispatch();
    const toast = useToast();

    const [wordInfo, setWordInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [forMain, setForMain] = useState(true);
    const { isOpen, onClose, onOpen } = useDisclose(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTranslate();
    }, []);

    async function getTranslate() {
        try {
            const resp = await api.get("/word/" + wordId, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            setWordInfo(resp.data.data);
        } catch (error) {
            console.log(error)   
        }
        setLoading(false);
    }

    async function handleEditWord() {
        try {
            let request = {
                mainText: wordInfo.mainText,
                translatedText: wordInfo.translatedText,
                mainLanguageId: wordInfo.mainLanguageId,
                translatedLanguageId: wordInfo.translatedLanguageId,

            }
            api.put("/word/" + wordId, request, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });

            dispatch(wordSliceActions.editWord({...wordInfo}));

            toast.show({
                title: "Kelimeniz başarıyla güncellendi"
            });

            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    function handleChangeMainText(e: string) {
        setWordInfo((prevState: any) => ({...prevState, mainText: e}));
    }

    function handleChangeTranslatedText(e: string) {
        setWordInfo((prevState: any) => ({...prevState, translatedText: e}));
    }

    function handleActionSheet(main: boolean) {
        onOpen();
        setForMain(main);
    }

    function handleSelect({ id, languageName, image }: any) {
        if(forMain) {
            setWordInfo((prevState: any) => ({...prevState,
                mainLanguageId: id,
                mainLanguageImage: image,
                mainLanguageName: languageName
            }));
        } else {
            setWordInfo((prevState: any) => ({...prevState,
                translatedLanguageId: id,
                translatedLanguageImage: image,
                translatedLanguageName: languageName
            }));
        }
        onClose();
    }

    const RenderLanguage = ({ languageName, id, image }: any) => {
        return (
            <Pressable flexDir="row" flex={1} bgColor="#f0f0f0" paddingY="10px"
            px="12px" borderRadius="12px" alignItems="center" onPress={() => handleSelect({languageName, id, image})}>
                <SvgUri uri={image} width="32" height="32"  />
                <Text ml="8px">{i18nFlags.t(languageName)}</Text>
            </Pressable>
        )
    }

    const languagesFilter = () => {
        if(search.trim() == "") {
            return languages?.filter((v: any) => {
                if(forMain) {
                    return v.id != wordInfo.translatedLanguageId;
                } else {
                    return v.id != wordInfo.mainLanguageId;
                }
            })
        }
        return languages?.filter((v: any) => {
            if(forMain && v.id == wordInfo.mainLanguageId) {
                return false;
            } 
            if(forMain == false && v.id == wordInfo.translatedLanguageId) {
                return false;
            }
            
            return i18nFlags.t(v.languageName).includes(search)
        });
    }

    if(loading) {
        return (
            <ActivityIndicator />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View mt="16px">
                <Header title={t("title")} />
            </View>

            <View flexDir="row" marginX="16px" alignItems="center" >
                <Pressable flexDir="row" alignItems="center" style={styles.languageContainer} flex={1} 
                onPress={() => handleActionSheet(true)}>
                    <SvgUri uri={wordInfo.mainLanguageImage} width="32" height="32"  />
                    <Text ml="8px" fontWeight="bold">{i18nFlags.t(wordInfo.mainLanguageName)}</Text>
                </Pressable>
                <Icon as={<Entypo name="swap" />} mx="16px" />
                <Pressable flexDir="row" alignItems="center" style={styles.languageContainer} flex={1}
                onPress={() => handleActionSheet(false)}>
                    <SvgUri uri={wordInfo.translatedLanguageImage} width="32" height="32"  />
                    <Text ml="8px" fontWeight="bold">{i18nFlags.t(wordInfo.translatedLanguageName)}</Text>
                </Pressable>
            </View>

            <View mx="16px" mt="16px" mb="12px" style={{ gap: 28 }}>
                <TranslatedInput value={wordInfo.mainText} onChangeText={handleChangeMainText}
                languageName={wordInfo.mainLanguageName} />
                <TranslatedInput value={wordInfo.translatedText} onChangeText={handleChangeTranslatedText}
                languageName={wordInfo.translatedLanguageName} />
            </View>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content px="12px" pt="12px">
                    <SearchInput value={search} onChangeText={setSearch} />
                    <Text alignSelf="flex-start" my="16px">{t("allLanguages")}</Text>
                    <FlatList
                        data={languagesFilter()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{width: maxW - 32, gap: 12}}
                        renderItem={({item}) => <RenderLanguage {...item} />}
                    />
                </Actionsheet.Content>
            </Actionsheet>
            <View mx="16px" mt="16px">
                <Button title="Kaydet" onPress={handleEditWord} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    languageContainer: {
        borderWidth: 1,
        borderColor: "#c3c3c3",
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 10
    }
})