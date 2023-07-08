const Component = require("../models/Component");
const User = require("../models/User");

exports.like = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
  
    const component = await Component.findById(id);
    if (!component) {
      return res.status(404).send({ message: 'Component not found' });
    }
  
    if (!user.likedComponents.includes(id)) {
      await User.updateOne({ _id: user._id }, { $push: { likedComponents: id } });
      await Component.updateOne({ _id: id }, { $inc: { likes: 1 } });
    }
  
    res.send({ likes: component.likes + 1 });
}

exports.unlike = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
  
    const component = await Component.findById(id);
    if (!component) {
      return res.status(404).send({ message: 'Component not found' });
    }
  
    await User.updateOne({ _id: user._id }, { $pull: { likedComponents: id } });
    await Component.updateOne({ _id: id }, { $inc: { likes: -1 } });
  
    res.send({ likes: Math.max(0, component.likes - 1) });
}

exports.getUserFavorites = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.json(user.likedComponents);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the favorite components',
        });
    }
}

