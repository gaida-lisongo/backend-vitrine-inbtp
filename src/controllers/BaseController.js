class BaseController {
    constructor() {
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
    }

    success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    error(res, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
}

module.exports = BaseController;