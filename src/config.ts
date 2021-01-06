
console.log(" from config")
console.log(process.env.ACCESS_TOKEN_VALIDITY_SEC);
console.log(" from config")

export const tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '3600'),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '3600'),
    issuer: process.env.TOKEN_ISSUER || 'localhost',
    audience: process.env.TOKEN_AUDIENCE || 'localhost',
}