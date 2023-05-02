module.exports = {
    EXPIRES: 1 * 60 * 60 * 1000, // 1 day
    SECRET: "jwt-key",
    UNLESS: [
        /^\/admin\/login/,
        /^\/admin\/verify/,
        /^\/admin\/register/,
        /^\/admin\/logout/,

        /^\/user\/login/,
        /^\/user\/verify/,
        /^\/user\/register/,
        /^\/user\/logout/,
        /^\/user\/code/,

        /^\/feedback/,
        /^\/favicon/,
    ]
}
