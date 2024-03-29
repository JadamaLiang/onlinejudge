export const apiRoutes = {
    auth: "/api/auth",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    quiz: "/api/quiz",
    quizAttempt: "/api/quiz-attempt",
};

export const questionTypes = {
    single: "单选题",
    multi: "多选题",
    trueFalse: "判断题",
    fillInBlank: "填空题",
};

export const gradingTypes = {
    allOrNothing: "全对或全错",
    rightMinusWrong: "对减少",
};