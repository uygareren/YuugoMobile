export const BASE_API_URL = 'http://192.168.1.146:3000/api/v1';

// MARGIN
export const MARGIN_HORİZONTAL = 16;

export const BLUE1 = "#0076CE";
export const BLUE2 = "#025b9e";
export const CARDBLUE1 = "#65bbfc";
export const CARDBLUE2 = "#26a0fc";
export const CARDPURPLE1 = "#8479fc";
export const CARDPURPLE2 = "#6355fa";
export const CARDRED1 = "#f7546a";
export const CARDRED2 = "#fa2d48";
export const LIGHT_RED = '#c43355';

export const formatDate = (date: Date) => {
    // Gün, Ay ve Yıl bilgilerini alıyoruz
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay 0 tabanlı olduğu için 1 ekliyoruz
    const year = date.getFullYear();

    // dd/mm/yyyy formatında string oluşturuyoruz
    return `${day}/${month}/${year}`;
}

export const getRankName = (point: number) => {
    if(point < 150) {
        return "rank1";
    } else if(point < 300) {
        return "rank2";
    } else if(point < 600) {
        return "rank3";
    } else if(point < 1000) {
        return "rank4";
    } else {
        return "rank5";
    }
}

export const mockLanguageLevelData = [
    { 
        id:"A1",
        title:"A1"
    },
    { 
        id:"A2",
        title:"A2"
    },
    { 
        id:"B1",
        title:"B1"
    },
    { 
        id:"B2",
        title:"B2"
    },
    { 
        id:"C1",
        title:"C1"
    },
]