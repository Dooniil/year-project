import User from "../database/userModel.js";

class getUsersController {
    // async getUser(req, res) {
    //     try {
    //         return res.status(200);
    //     } catch (e) {
    //         console.log(e);
    //         return res.status(400).json({ message: "Get users error" });
    //     }
    // }

    async getUsersAdmin(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Get users error" });
        }
    }
}

export default new getUsersController();


