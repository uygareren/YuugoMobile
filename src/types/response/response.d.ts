export type ResponseType<T> = {
    data: T
    success: boolean
    message: string
}

export type LanguageType = {
    id: number;
    languageName: string;
    image: string;
}