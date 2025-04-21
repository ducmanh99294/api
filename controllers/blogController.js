const blogModel = require("../models/blogModel");

const createBlogController = async (req, res) => {
    try {
        const newBlog = new blogModel(req.body);
        const saveBlog = await newBlog.save();
        res.status(200).json({
            success: true,
            message: 'tao moi blog thanh cong',
            saveBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: 'Loi ham createBlogController',
            error: error.message
        })
    }
}
const getAllBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        if (blogs.length === 0) {
            return res.status(404).json({
                message: 'Không có bất kì blog nào'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Lấy tất cả blog thanh công',
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham getAllBlog',
            error: error.message
        })
    }
}

const getBlogById = async (req, res) => {
    try {
        const id = req.params.id
        const blogExist = await blogModel.findById(id);
        if (!blogExist) {
            return res.status(404).json({
                message: 'san pham khog ton tai'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Lấy blog theo id thành công',
            blogExist
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham getBlogById',
            error: error.message
        })
    }
}

const updateBlogController = async (req, res) => {
    try {
        const id = req.params.id;
        const blogExist = await blogModel.findById(id);
        if (!blogExist) {
            return res.status(404).json({
                message: 'Khong tim thay blog'
            })
        }
        const update = await blogModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json({
            update
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham updateBlogController',
            error: error.message
        })
    }
}

const deleteBlogController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const blogExist = await blogModel.findById(id);
        if (!blogExist) {
            return res.status(404).json({
                message: 'Khong the xoa blog'
            })
        }
        await blogModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'Xoa blog thanh cong',

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Loi ham deleteBlogController",
            error: error.message
        })
    }
}

const demSoLuongBlog = async (req, res) => {
    try {
        const blogCount = await blogModel.countDocuments();
        res.status(200).json({
            success: true,
            message: 'Dem so luong blog thanh cong',
            blog: blogCount
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham demSoLuongBlog',
            error: error.message
        })
    }
}
module.exports = {
    createBlogController,
    getAllBlog,
    getBlogById,
    updateBlogController,
    deleteBlogController,
    demSoLuongBlog
}