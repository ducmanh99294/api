const { hashPassword, comparePassword } = require("../helper/userHelper");
const userModel = require("../models/useModel");
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, gender } = req.body;
        
        if (!name) {
            return res.status(400).send({ error: 'Hay nhap ten' });
        };
        if (!email) {
            return res.status(400).send({ message: 'Hay nhap email' })
        };
        if (!password) {
            return res.status(400).send({ message: 'Hay nhap password' })
        }
        
        // Kiểm tra xem người dùng đã tồn tại chưa
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(200).send({
                success: false,
                message: 'Đã đăng kí, vui lòng đăng nhập'
            })
        }

        // Mã hóa mật khẩu
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            phone: phone || '',  // Không bắt buộc nhập phone
            address: address || '',  // Không bắt buộc nhập address
            gender: gender || '',  // Không bắt buộc nhập gender
            password: hashedPassword,
        });

        await user.save(); // Lưu người dùng vào DB

        // Trả về thông báo thành công và thông tin người dùng
        res.status(201).send({
            success: true,
            message: 'Đăng kí thành công',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham registerController'
        })
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra thông tin nhập vào
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Tài khoản hoặc mật khẩu không hợp lệ',
            });
        }

        // Kiểm tra xem người dùng có tồn tại không
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email chưa được đăng ký',
            });
        }

        // So sánh mật khẩu
        const soSanh = await comparePassword(password, user.password);
        if (!soSanh) {
            return res.status(400).send({
                success: false,
                message: 'Mật khẩu không đúng',
            });
        }

        // Tạo JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Trả về thông tin người dùng và token
        res.status(200).send({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi khi login',
            error: error.message,  // Trả về thông báo lỗi chi tiết
        });
    }
};

/*********************Hiển thị tất cả người dùng********************* */
const getAllUsers = async (req, res) => {
    try {
        const getUser = await userModel.find();
        if (!getUser || getUser.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng'
            })
        }

        res.status(200).json(getUser)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi không lấy được tất cả user',
            error: error.message
        })
    }
}

//****************************Xoa nguoi dung******************************** */
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await userModel.findById(id);
        if (!userExist) {
            return res.status(404).json({
                message: 'khong tim thay id ngui dung de xoa'
            })
        }
        res.status(200).json(userExist)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi lấy người dùng theo id',
            error: error.message
        })
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const xoaUser = await userModel.findByIdAndDelete(id);
        if (!xoaUser) {
            return res.status(404).json({
                message: 'Nguoi dungf ko ton tai'
            })
        }
        res.status(200).json({
            message: 'Xóa người dùng thành công'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Lỗi khi Xoa người dùng ',
            error: error.message
        })
    }
}
//****************************Cap nhap nguoi dung******************************** */
// Controller update user
const updateUser = async (req, res) => {
    const { oldEmail, newName, newEmail, newPassword } = req.body;
  
    try {
      // Tìm người dùng cũ theo email
      const user = await User.findOne({ email: oldEmail });
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found!" });
      }
  
      // Cập nhật thông tin người dùng
      user.name = newName || user.name;
      user.email = newEmail || user.email;
      user.password = newPassword || user.password;
  
      // Lưu người dùng với thông tin mới
      await user.save();
  
      return res.status(200).json({ success: true, message: "User updated successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  };

module.exports = {
    registerController,
    loginController,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
}