module.exports = {
    EXPIRES: 1 * 60 * 60 * 1000, // 1 day
    SECRET: "jwt-key",
    UNLESS: [
        /^\/admin\/login/,
        /^\/admin\/verify/,
        /^\/admin\/register/,
        /^\/admin\/logout/,

        /^\/users\/login/,
        /^\/users\/verify/,
        /^\/users\/register/,
        /^\/users\/logout/,
        /^\/users\/code/,

        /^\/feedback/,
        /^\/favicon/,
    ]
}
