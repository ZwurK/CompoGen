const { Configuration, OpenAIApi } = require("openai");
const Component = require("../models/Component");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generate = async (req, res) => {
    const component = req.body.component;
    const framework = req.body.framework;

    // Define the prompt for the AI model
    const prompt = `Create a visually stunning, one-of-a-kind ${component} that is highly innovative, adaptable to different devices, and easy to navigate using only html and ${framework}.`;

    try {
        // Make the API call to OpenAI
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            temperature: 1,
            max_tokens: 1000,
            top_p: 1
        });

        // Extract the generated text
        const generatedText = response.data.choices[0].text.trim();

        // Create a new component instance
        const newComponent = new Component({
            type: component,
            framework: framework,
            code: generatedText
        });

        // Save the new component to the database
        await newComponent.save();

        // Send the generated text in the HTTP response
        res.json({
            success: true,
            message: `Component ${component} generated successfully`,
            generatedComponent: generatedText
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while generating the component',
        });
    }
};


exports.explore = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let skip = (page - 1) * limit;

        const components = await Component.find().skip(skip).limit(limit);
        const total = await Component.countDocuments();

        res.json({
            components,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the components',
        });
    }
};



exports.getOneElement = async (req, res) => {
    const id = req.params.id;

    try {
        const component = await Component.findById(id);

        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        res.json(component);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the component',
        });
    }
};

exports.top = async (req, res) => {
    try {
        const topComponents = await Component.find()
            .sort({ likes: -1 })
            .limit(10);

        res.json(topComponents);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the top components',
        });
    }
};
