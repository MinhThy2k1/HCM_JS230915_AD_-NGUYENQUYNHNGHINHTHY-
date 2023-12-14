import userModel from "../models/user.model";
import axios from 'axios';
export default {
    register: async function (req, res) {
        try {
            const { name, des } = req.body
            let { status, message, data } = await userModel.register(name, des)
            if (status) {

                return res.status(200).json({
                    data,
                    message
                });
            }
            else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log(err);
        }


    },
    getAllUser: async function (req, res) {
        try {
            let { status, message, data } = await userModel.getAllUser();
            if (status) {
                return res.status(200).json(data);
            }
            else {
                return res.status(500).json({ message });
            }
        } catch (err) {
            console.log('Error fetching users:', err);
        }

    },
    getUserById: async function (req, res) {
        try {
            let { status, message, data } = await userModel.getUserById(parseInt(req.params.id));
            if (status) {
                return res.status(200).json(data);
            } else {
                return res.status(500).json(message);
            }

        } catch (err) {
            console.log("err", err);

        }
    },

    deleteUserById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            let { status, message, data } = await userModel.deleteUserById(id)
            if (status) {
                return res.status(200).json(message);
            } else {
                return res.status(500).json(message);
            }
        } catch (err) {
            console.log(err);
        }

    },
    updateUserById: async function (req, res) {
        try {
            const id = parseInt(req.params.id)
            const { name, des } = req.body
            if (!name || !des) {
                return res.status(400).json({ Error: "missing fields" })
            } else {
                let { status, message, data } = await userModel.updateUserById(id, name, des)
                if (status) {
                    return res.status(200).json({
                        data
                    });
                } else {
                    return res.status(500).json(message);
                }
            }
        } catch (err) {
            console.log(err);
        }


    },

}


