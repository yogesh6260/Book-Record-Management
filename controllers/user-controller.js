const { UserModel, BookModel } = require('../models/index');

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    if (!users) {
        return res.status(404).json({
            success: false,
            message: "Users not found!"
        });
    }
    return res.status(200).json({
        success: true,
        data: users,
    });
};

exports.getUserByID = async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!"
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
};

exports.addNewUser = async (req, res) => {
    const { data } = req.body;
    const newUser = await UserModel.create({ ...data }, { new: true });
    return res.status(201).json({
        success: true,
        data: newUser,
    });
};

exports.updateUserByID = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    await UserModel.findByIdAndUpdate({ _id: id }, { $set: { ...data }, }, { new: true });

    return res.status(200).json({
        success: true,
        message: "User Updated Successfully!",
    });
};

exports.deleteUserByID = async (req, res) => {
    const { id } = req.params;

    await UserModel.findByIdAndDelete({ _id: id }, { new: true });
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully!"
    });
};

exports.getUserSubscriptionDetailsByID = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found!"
        });
    }
    const getDateInDay = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        }
        else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        }
        else if (user.subscriptionType === "Standard") {
            date += 180;
        }
        else if (user.subscriptionType === "Premium") {
            date += 365;
        }
        return date;
    };
    // subscription calculation here
    // Jan 1, 1970
    let returnDate = getDateInDay(user.returnDate);
    let currentDate = getDateInDay();
    let subscriptionDate = getDateInDay(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
    };
    return res.status(200).json({
        success: true,
        data
    });
};