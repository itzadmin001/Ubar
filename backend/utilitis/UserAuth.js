const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET_KEY || "Ubar@123"

const generateUserPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error('Error generating password:', err);
        throw err;
    }
};
const ComparePassword = (old_password, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, old_password, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const GanrateToken = (email, role) => {
    try {
        const token = jwt.sign({ email: email, role: role }, SecretKey, { expiresIn: "1h" });;
        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        throw err;
    }
}
const VarifyToken = (Old_token) => {
    try {
        const decoded = jwt.verify(Old_token, SecretKey);
        return decoded;
    } catch (err) {
        console.error('Error generating token:', err);
        return null;
    }
};
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    return otp;
}

module.exports = { generateUserPassword, GanrateToken, ComparePassword, VarifyToken, generateOTP };