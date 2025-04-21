const productModel = require("../models/productModel")

const createProductController = async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const saveProduct = await newProduct.save();
        res.status(200).json({
            success: true,
            message: 'Tao san pham moi thanh cong',
            saveProduct
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Loi khi tao san pham moi',
            error: error.message
        })
    }
}

// lay tat ca san pham
const getALlProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'khong co bat ky san pham nao'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Lay tat ca san pham thanh cong',
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Loi ham getAllProducts',
            error: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await productModel.findById(id);
        if (!productExist) {
            return res.status(200).json({
                success: true,
                message: 'Lay san pham thanh cong',
                product: productExist
            });

        }
        res.status(200).json({
            productExist
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'loi ham getProductByID',
            error: error.message
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await productModel.findById(id);
        if (!productExist) {
            return res.status(404).json({
                success: false,
                message: 'Khong tim  thay sp'
            })
        }
        await productModel.findByIdAndDelete(id);
        res.status(200).json({
            message: ' Xoa sp thanh cong'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'loi ham deleteProduct',
            error: error.message
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await productModel.findById(id);
        if (!productExist) {
            return res.status(404).json({
                success: true,
                message: 'khong the update san pham'
            })
        }
        const update = await productModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json({
            success: true,
            message: 'update san pham thanh cong',
            update
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'loi ham updateProduct',
            error: error.message
        })
    }
}
module.exports = {
    createProductController,
    getALlProducts,
    getProductById,
    deleteProduct,
    updateProduct
}