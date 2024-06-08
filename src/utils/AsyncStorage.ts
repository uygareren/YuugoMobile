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