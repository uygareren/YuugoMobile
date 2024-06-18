import { FlatList, Icon, View } from "native-base";
import { SafeAreaView } from "react-native";
import { mockLanguageLevelData } from "../utils/utils";
import { SelectCard } from "../components/cards/SelectCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import { useI18n } from "../hooks/useI18n";
import { useState } from "react";
import { Button } from "../components/Button";
import { SvgUri } from "react-native-svg";
import { useGetLanguagesQuery } from "../store/services/utilSerivce";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";
import { accountSliceActions } from "../store/slices/accountSlice";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import TitleText from "../components/TitleText";

export default function AddNewLanguageScreen() {
    const jwt = useSelector<RootStateType>(state => state.account.jwt);
    const oldLanguages = useSelector<RootStateType, any>(state => state.account.userInfo?.languages);

    const { t } = useI18n("RegisterSLanguageLevel");
    const profileI18n = useI18n("ProfileScreen");
    const i18nFlags = useI18n("language")
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const { data: languages } = useGetLanguagesQuery(null);
    
    const [loading, setLoading] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
    const [page, setPage] = useState(0);

    function handleSelectLangauge(id:number){
        if(selectedLanguage == id) {
            setSelectedLanguage(null);
        } else {
            setSelectedLanguage(id);
        }
    }

    function handleSelectLanguageLevel(id: string){
        if(id == selectedLevel) {
            setSelectedLevel("")
        } else {
            setSelectedLevel(id);
        }
    }

    async function handleSaved() {
        setLoading(true);
        try {
            const resp = await api.post("/user/language?rowback=true", {
                languageId: selectedLanguage,
                level: selectedLevel
            }, {
                headers: {
                    authorization: `Bearer ${jwt}`
                }
            });
            
            const data = resp.data.data;
            
            dispatch(accountSliceActions.addLanguage(data.filter((v: any) => v.languageId == selectedLanguage)[0]));
            
            setLoading(false);

            navigation.goBack();
        } catch (error) {
            setLoading(false);
        }
    }

    function handlePage() {
        setPage(1);
    }

    const SetComponent = () => {
        if(page == 0) {
            return (
                <View>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={languages?.filter((v) => oldLanguages.findIndex((value: any) => value.languageId == v.id))}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item, index}) => (
                        <SelectCard
                            isSelected={item.id == selectedLanguage}
                            text={i18nFlags.t(item.languageName)}
                            onPress={() => handleSelectLangauge(item.id)}
                        >
                            <SvgUri style={{marginLeft: 8}} uri={item.image} width="24" height="24"  />
                        </SelectCard>
                    )}
                    contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
                    />
                
                    <Button
                        onPress={handlePage as () => void}
                        isActive={selectedLanguage ? true : false}
                        mt="20px" mb="16px" title={t("toCountinue")}
                    />
                </View>
            )
        } else {
            return (
                <View mx="16px">
                    <FlatList
                    data={mockLanguageLevelData}
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) => (
                        <SelectCard key={index.toString()}
                            isSelected={item.id == selectedLevel}
                            text={item.title}
                            onPress={() => handleSelectLanguageLevel(item.id)}
                        />
                    )}
                    contentContainerStyle={{ rowGap: 16, marginTop: 28 }}
                    />
                    <Button
                        onPress={handleSaved as () => void}
                        isActive={selectedLevel ? true : false}
                        mt="20px" loading={loading}
                        title={t("toCountinue")}
                        mb="16px"
                    />
                
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            <View px="16px" backgroundColor="white" flex={1}>
                <View mt="16px">
                    <Icon as={<FontAwesome6Icon name="chevron-left" />} color="gray.900" />
                    <TitleText>{profileI18n.t("addLanguageBtn")}</TitleText>
                </View>
                {SetComponent()}
            </View>
        </SafeAreaView>
    )
}