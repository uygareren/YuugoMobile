import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, View, useTheme } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import TitleText from "../../components/TitleText";
import { RootStackParamList } from "../../types/react-navigation";
import { MARGIN_HORİZONTAL } from "../../utils/utils";

type KvkkModalScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "KvkkModal"
>;

export default function KvkkModalScreen(){

    const navigation = useNavigation<KvkkModalScreenNavigationProp>();
    const { width, height } = Dimensions.get("screen");
    const theme = useTheme();

    return(
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: theme.colors.white }]}>
                <Header title={"KVKK Sözleşmesi"}/>
            <View mt="16px">
                <TitleText>KİŞİSEL VERİLERİN KORUNMASI KANUNU KAPSAMINDA AYDINLATMA METNİ</TitleText>
                <View mt="16px">
                    <Text mb="32px" style={styles.infoText}>
                    1. Veri Sorumlusu ve Temsilcisi

                    [Şirket Adı] olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, kişisel verilerin korunmasına büyük önem vermekteyiz. Bu bilinçle, kişisel verilerinizin güvenliğini sağlamak için gerekli teknik ve idari tedbirleri almaktayız.

                    2. Kişisel Verilerin İşlenme Amaçları

                    Kişisel verileriniz, KVKK’ya uygun olarak aşağıdaki amaçlarla işlenmektedir:

                    Hizmetlerimizin sunulması ve yürütülmesi,
                    Yasal yükümlülüklerimizin yerine getirilmesi,
                    Müşteri ilişkilerinin yönetimi ve geliştirilmesi,
                    Pazarlama faaliyetlerinin yürütülmesi,
                    Çalışan ve müşteri memnuniyetinin sağlanması,
                    Finans ve muhasebe işlemlerinin gerçekleştirilmesi.
                    3. İşlenen Kişisel Veriler ve İşleme Yöntemleri

                    Kişisel verileriniz, otomatik ya da otomatik olmayan yöntemlerle, ofislerimiz, internet sitemiz, sosyal medya mecralarımız ve benzeri vasıtalarla toplanabilir. İşlenen kişisel veriler şunlardır:

                    Kimlik bilgileri (ad, soyad, T.C. kimlik numarası vb.),
                    İletişim bilgileri (telefon numarası, e-posta adresi, adres vb.),
                    Finansal bilgiler (banka hesap numarası, IBAN vb.),
                    Müşteri işlem bilgileri (sipariş bilgileri, müşteri numarası vb.),
                    Pazarlama bilgileri (alışveriş geçmişi, anket sonuçları vb.).
                    4. Kişisel Verilerin Aktarılması

                    Toplanan kişisel verileriniz, yukarıda belirtilen amaçlarla sınırlı olarak ve KVKK’nın öngördüğü çerçevede yurt içinde ve yurt dışında bulunan iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere aktarılabilir.

                    5. Kişisel Verilerin Saklanma Süresi

                    Kişisel verileriniz, ilgili mevzuatta öngörülen veya işleme amaçlarına uygun süre boyunca saklanacaktır. Sürenin sona ermesinin ardından, kişisel verileriniz silinmekte, yok edilmekte veya anonim hale getirilmektedir.

                    6. Veri Sahibinin Hakları

                    KVKK’nın 11. maddesi uyarınca veri sahipleri, aşağıdaki haklara sahiptir:

                    Kişisel verilerinin işlenip işlenmediğini öğrenme,
                    Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,
                    Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,
                    Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,
                    Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,
                    KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,
                    Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
                    İşlenen verilerin münhasıran otomatik sistemler aracılığıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,
                    Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.
                    Bu haklarınızı kullanmak için [Şirket Adı]’na yazılı olarak başvurabilirsiniz.

                    İletişim Bilgileri:

                    Adres: [Şirket Adresi]
                    E-posta: [E-posta Adresi]
                    Telefon: [Telefon Numarası]

                    [Şirket Adı] olarak, kişisel verilerinizin korunması ve gizliliğinizin sağlanması konusundaki sorumluluğumuzun bilincindeyiz.
                    </Text>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: MARGIN_HORİZONTAL,
    },
    infoText: {
        fontSize: 18,
        fontWeight:"600"
    },
});