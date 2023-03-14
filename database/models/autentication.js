import db from "./index"

export const checkUserEmailPassword = async(name, password) => {

    const user = await db.Usuarios.findOne({ where: {username, active: true} });

    if (!user) {
        return null;
    }

    if (!user.isValidPassword(password)) {
        return null;
    }

    const {
        id,
        name,
        email,
    } = user

    return {
        id,
        name,
        email,
    }
}