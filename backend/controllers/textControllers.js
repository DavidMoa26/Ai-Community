import Text from '../models/textPost.js';

export const getAllTextsPosts = async (req, res) => {
    try {
        const posts = await Text.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
}

export const createTextsPost = async (req, res) => {
    try {
        const { name, input, result } = req.body;

        const newPost = await Text.create({
            name,
            input,
            result
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
}