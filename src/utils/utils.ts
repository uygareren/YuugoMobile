export const BASE_API_URL = 'http://192.168.1.146:3000/api/v1';

// MARGIN
export const MARGIN_HORİZONTAL = 16;

export const formatDate = (date: Date) => {
    // Gün, Ay ve Yıl bilgilerini alıyoruz
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay 0 tabanlı olduğu için 1 ekliyoruz
    const year = date.getFullYear();

    // dd/mm/yyyy formatında string oluşturuyoruz
    return `${day}/${month}/${year}`;
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