import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    register: async function (name, des) {
        try {
            const user = await prisma.users.create({
                data: {
                    name: name,
                    des: des,
                },
            });
            return {
                status: true,
                message: "đã tạo thành công sinh viên",
                data: user
            }
        } catch (err) {
            console.log('err', err)
            let message = null;
            return {
                status: false,
                message: "modelError",
                data: null
            }
        }
    },
    getAllUser: async function () {
        try {
            let user = await prisma.users.findMany();
            return {
                status: true,
                data: user
            }

        } catch (err) {
            console.log('Error:', err);
            let message = null;
            return {
                status: false,
                message: message ? message : "modelError",
                data: null
            }
        }
    },
    getUserById: async function (id) {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    id: Number(id),
                }

            });
            return {
                status: true,
                message: "ok",
                data: user
            };
        } catch (err) {
            console.log('Error model:', err);
            return {
                status: false,
                message: "modelError",
                data: null,
            };
        }
    },

    deleteUserById: async function (id) {
        try {
            let user = await prisma.users.delete({
                where: {
                    id: id
                }

            });
            return {
                status: true,
                message: "ok",
                data: user
            };


        } catch (err) {
            console.log(err);
        }

    },
    updateUserById: async function (id, name, des) {
        try {
            let user = await prisma.users.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name,
                    des: des,

                },
            })
            return {
                status: true,
                message: "ok",
                data: user
            }

        } catch (err) {
            console.log(err);
        }

    },
}



