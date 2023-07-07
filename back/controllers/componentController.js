const { Configuration, OpenAIApi } = require("openai");
const Component = require("../models/Component");
const mongoosePaginate = require("mongoose-paginate-v2");

exports.generate = async (req, res) => {
  let prompt, component, framework, style, primaryColor, secondaryColor;

  if (req.body.prompt && req.body.prompt != "") {
    component = 'custom';
    framework = 'custom';
    style = 'custom';
    primaryColor = 'custom';
    secondaryColor = 'custom';
    prompt = req.body.prompt;
  } else {
    component = req.body.component;
    framework = req.body.framework;
    style = req.body.style;
    primaryColor = req.body.primaryColor;
    secondaryColor = req.body.secondaryColor;
    prompt = `Design a visually stunning, one-of-a-kind, highly innovative, adaptable to different devices, and easy to navigate ${component} component using ${framework} with a ${style} style.`;
  }

  console.log(prompt);

  const user = req.user;

  let setApiKey;
  if (user.apiKey && user.apiKey !== "") {
    setApiKey = user.apiKey;
    console.log(typeof setApiKey);
  } else {
    setApiKey = process.env.OPENAI_API_KEY;
    console.log(typeof setApiKey);
  }

  console.log(setApiKey);

  const configuration = new Configuration({
    apiKey: setApiKey,
  });
  const openai = new OpenAIApi(configuration);

  // Check if the user has reached the limit of generated components
  if (req.user.numberGeneration >= 10 && !user.apiKey && user.apiKey == "") {
    return res.status(400).json({
      success: false,
      message: "You have reached the limit of 10 generated components.",
    });
  }

  try {
    // Make the API call to OpenAI
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
    });

    // Extract the generated text
    const generatedText = response.data.choices[0].text.trim();

    // Create a new component instance
    const newComponent = new Component({
      type: component,
      framework: framework,
      code: generatedText,
    });

    // Save the new component to the database
    const savedComponent = await newComponent.save();

    // Increment the number of generated components for the user
    req.user.numberGeneration += 1;
    await req.user.save();

    // Send the generated text in the HTTP response
    res.json({
      success: true,
      message: `Component ${component} generated successfully`,
      generatedComponent: generatedText,
      componentId: savedComponent._id,
    });
  } catch (error) {
    console.error(error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return res.status(401).json({
            success: false,
            message: "Invalid API key.",
          });
        case 429:
          return res.status(429).json({
            success: false,
            message: "Rate limit reached or quota exceeded.",
          });
        case 500:
          return res.status(500).json({
            success: false,
            message: "Server error on OpenAI's side.",
          });
        case 503:
          return res.status(503).json({
            success: false,
            message: "OpenAI's servers are currently overloaded.",
          });
        default:
          return res.status(500).json({
            success: false,
            message: "An unknown error occurred while generating the component",
          });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while generating the component",
      });
    }
  }
};

exports.explore = async (req, res) => {
  const { page = 1, limit = 10, sort, filter } = req.query;
  let filterObject = {};
  let sortObject = {};

  if (filter) {
    const filterArray = filter.split(",");
    filterArray.forEach((filter) => {
      const [key, value] = filter.split(":");
      filterObject[key] = value;
    });
  }

  if (sort) {
    const sortArray = sort.split(",");
    sortArray.forEach((sort) => {
      const [key, order] = sort.split(":");
      sortObject[key] = order === "desc" ? -1 : 1;
    });
  }

  try {
    const options = {
      page,
      limit,
      sort: sortObject,
      collation: {
        locale: "en",
      },
    };
    const result = await Component.paginate(filterObject, options);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message, stack: error.stack });
  }
};

exports.getOneComponent = async (req, res) => {
  const id = req.params.id;

  try {
    const component = await Component.findById(id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: "Component not found",
      });
    }

    res.json(component);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the component",
    });
  }
};

exports.top = async (req, res) => {
  try {
    const topComponents = await Component.find().sort({ likes: -1 }).limit(10);

    res.json(topComponents);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the top components",
    });
  }
};
