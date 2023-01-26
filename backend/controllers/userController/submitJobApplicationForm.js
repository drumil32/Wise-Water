const WorkerApplication = require('../../models/workerApplicationModel');
const { workerValidation } = require('../../validations/workerValidation/workerValication');

// @desc    submitJobApplication :- it will use to submit job application of user to company
// @route   post /api/user/
// @access  public

exports.submitJobApplicationForm = async (req, res) => {

    const error = await workerValidation(req.body);

    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    } else {
        const { firstname, email, lastname, contact, companyname } = req.body;
        try {
            const worker = await WorkerApplication.create({
                firstname,
                lastname,
                contact,
                email,
                company_name: companyname
            });

            res.status(201).json({
                _id: worker._id,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
};
