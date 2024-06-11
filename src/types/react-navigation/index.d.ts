export type RootStackParamList = {
    Login: undefined;
    Screen2: { userId: string };
    RegisterEmail:undefined,
    RegisterConfirmCode: {
        activationToken: string
    },
    RegisterConfirmPassword: {
        jwt: string
    },
    RegisterInfo: {
        stepper: 0
    },

    ForgetPasswordEmail: undefined,
    ForgetPasswordCode: {
        activationToken: string
    },
    ForgetPasswordConfirmPassword: {
        activationToken: string
    },

};