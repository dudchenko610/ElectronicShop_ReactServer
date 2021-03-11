export const CURRENT_PAGE_TYPES = {
    EMPTY_PAGE : "EMPTY_PAGE",

    HOME_PAGE : "HOME_PAGE",
    LOGIN_PAGE : "LOGIN_PAGE",
    REGISTER_PAGE : "REGISTER_PAGE",
    PROFILE_PAGE : "PROFILE_PAGE",
    PROFILESETTINGS_PAGE : "PROFILESETTINGS_PAGE",
    CHAT_PAGE : "CHAT_PAGE",
    CONSOLE_PAGE: "CONSOLE_PAGE"
}

export const switchToHomePageAction = () => {
    return {
        type: CURRENT_PAGE_TYPES.HOME_PAGE
    }
}

export const switchToLoginPageAction = () => {
    return {
        type: CURRENT_PAGE_TYPES.LOGIN_PAGE
    }
}

export const switchToRegisterPageAction = () => {
    return {
        type: CURRENT_PAGE_TYPES.REGISTER_PAGE
    }
}

export const switchToProfilePageAction = () => {
    return {
        type : CURRENT_PAGE_TYPES.PROFILE_PAGE
    }
}

export const switchToProfileSettingsPageAction = () => {
    return {
        type : CURRENT_PAGE_TYPES.PROFILESETTINGS_PAGE
    }
}

export const switchToChatPageAction = () => {
    return {
        type : CURRENT_PAGE_TYPES.CHAT_PAGE
    }
}

export const switchToConsolePageAction = () => {
    return {
        type : CURRENT_PAGE_TYPES.CONSOLE_PAGE
    }
}