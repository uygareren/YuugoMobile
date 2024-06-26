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

export type ChatRoomsType = {
    id: number;
    chatName: string;
    chatLanguageLevel: string;
    languageId: number;
    languageName: string;
    languageImage: string;
    avatarUrl: string;
    username: string;
    userId: number;
    interestId: number;
    interestName: string;
    maxUserCount: number;
    countDownMinute: number;
    userCount: number;
    explorePoint: number;
    minutePass: number;
}