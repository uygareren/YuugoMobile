export type RootStackParamList = {
    Login: undefined;
    Screen2: { userId: string };
    RegisterEmail:undefined,
    RegisterConfirmCode: {
        activationToken: string
    },
    RegisterConfirmPassword: undefined,
    ForgetPasswordEmail: undefined,
    ForgetPasswordCode: undefined,
    ForgetPasswordConfirmPassword:undefined
};