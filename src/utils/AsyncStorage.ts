import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export async function setSecureStoreToken(token: string) {
    try {
        await Keychain.setGenericPassword('jwt', token);
        return true;
    } catch (error) {
        return false
    }
}

export async function removeSecureStoreToken() {
    try {
        await Keychain.resetGenericPassword();
        return true;
    } catch (error) {
        return false;
    }
}

export async function getJwtToken() {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            return credentials.password;
        }
        return false;
    } catch (error) {
        return false;
    }
}

async function getSearches(): Promise<string[]> {
    const result = await AsyncStorage.getItem("searcheds");
    if(result) {
        return JSON.parse(result) as string[];
    }

    return [];
}

async function setSearches(searchTerm: string) {
    let data = await getSearches()
    const index = data.findIndex((v) => v == searchTerm);
    
    if(index) {
        data = data.filter((v, i) => i != i);
    }

    data.unshift(searchTerm);
    await AsyncStorage.setItem("searcheds", JSON.stringify(data));
}

async function clearSearches() {
    await AsyncStorage.removeItem("searcheds");
}

async function removeItemSearches(index: number) {
    const data = await getSearches()

    await AsyncStorage.setItem("searcheds", JSON.stringify(data.filter((v, i) => i != index)));
}

export const  AsyncStorageSearch = {
    getSearches,
    setSearches,
    clearSearches,
    removeItemSearches
}
