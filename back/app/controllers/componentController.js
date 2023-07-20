const { Configuration, OpenAIApi } = require("openai");
const Component = require("../models/Component");
const mongoosePaginate = require("mongoose-paginate-v2");

exports.generate = async (req, res) => {
  let prompt, component, framework, style, primaryColor, secondaryColor;

  if (req.body.prompt && req.body.prompt._value && req.body.prompt._value != "") {
    component = "custom";
    framework = "custom";
    style = "custom";
    primaryColor = "custom";
    secondaryColor = "custom";
    prompt = req.body.prompt._value;
  } else {
    component = req.body.component._value;
    framework = req.body.framework._value;
    style = req.body.style._value;
    primaryColor = req.body.primaryColor._value;
    secondaryColor = req.body.secondaryColor._value;

    const basedPromptExample = `You are a senior expert in web development, modifies the ${component}'s class attribute with ${framework} classes to make it ${style}.`;
    const basedPrompt = `You are a senior expert in web development, generates ${component} using ${framework} classes to make it ${style}.`;

    switch (component) {
      case "card":
        prompt =
          basedPrompt +
          "The card should include an image at the top, a title, a short description, and a 'Learn More' button at the bottom. It should have a shadow effect to give a 3D look.";
        break;
      case "alert":
        prompt =
          basedPrompt +
          "The alert should include an icon indicating the type of alert (success, warning, error, info), a short message, and a 'Dismiss' button. It should be noticeable and should disappear after a few seconds.";
        break;
      case "pricing":
        prompt =
          basedPrompt +
          "The pricing section should include three different pricing tiers - Basic, Premium, and Pro. Each tier should include a list of features, the price, and a 'Choose Plan' button.";
        break;
      case "header":
        prompt =
          basedPrompt +
          "The header should include a logo on the left, links to 'Home', 'About', 'Services', 'Contact' pages, and a 'Sign In' button on the right. It should be fixed at the top of the page and remain visible when scrolling.";
        break;
      case "call to action":
        prompt =
          basedPrompt +
          "The call to action section should include a catchy headline, a short description, and a 'Get Started' button. It should be visually striking to attract user attention.";
        break;
      case "hero section":
        prompt =
          basedPrompt +
          "The hero section should include a large, eye-catching image or background video, a bold headline, a short description, and a 'Learn More' button. It should be the first thing users see when they visit the website.";
        break;
      case "form":
        prompt =
          basedPrompt +
          "The form should include a title, fields for the user's email and password, a 'Remember me' checkbox, and a 'Log In' button. It should also include a 'Forgot password?' link and a 'Create account' link.";
        break;
      case "footer":
        prompt =
          basedPrompt +
          "The footer should include a copyright notice on the left, links to 'Privacy Policy', 'Terms of Service', and 'Contact Us' pages in the middle, and social media icons on the right.";
        break;
      case "navbar":
        prompt =
          basedPrompt +
          "The navbar should include a logo on the left, links to 'Home', 'About', 'Services', and 'Contact' pages, and an account button on the right.";
        break;
      case "table":
        prompt =
          basedPromptExample +
          `<table class=''>
        <thead class=''>
          <tr>
            <th class=''>Name</th>
            <th class=''>Age</th>
            <th class=''>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr class=''>
            <td class=''>John Doe</td>
            <td class=''>25</td>
            <td class=''>New York</td>
          </tr>
          <tr class=''>
            <td class=''>Jane Doe</td>
            <td class=''>30</td>
            <td class=''>London</td>
          </tr>
          <tr class=''>
            <td class=''>John Smith</td>
            <td class=''>45</td>
            <td class=''>Paris</td>
          </tr>
        </tbody>
      </table>
      `;
        break;
      case "button":
        prompt = basedPromptExample + "<button class=''>Click Me !</button>";
        break;
      case "input":
        prompt =
          basedPromptExample +
          "<input type='text' class='' placeholder='search...'>";
        break;
      case "select":
        prompt =
          basedPromptExample +
          `<select class="">
          <option class="">--Please choose an option--</option>
          <option class="">Dog</option>
          <option class="">Cat</option>
          <option class="">Hamster</option>
          <option class="">Parrot</option>
          <option class="">Spider</option>
          <option class="">Goldfish</option>
      </select>`;
        break;
      case "checkbox":
        prompt =
          basedPromptExample + "<input class='' type='checkbox' checked>";
        break;
      default:
        prompt = `Generate a ${component} component using ${framework} with a ${style} style. The component should be responsive, easy to navigate, and adaptable to different devices.`;
    }
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
      prompt: prompt,
    });

    // Save the new component to the database
    const savedComponent = await newComponent.save();

    // Increment the number of generated components for the user
    req.user.numberGeneration += 1;

    // User history of generated component
    req.user.generatedComponents.push(savedComponent._id);

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
  console.log(req.query)
  const { page, limit, sort, filterString } = req.query;
  let filterObject = {};
  let sortObject = {};

  if (filterString) {
    const filterArray = filterString.split(",");
    filterArray.forEach((filterString) => {
      const [key, value] = filterString.split(":");
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
    res.json(result.docs);
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

exports.getUserHistory = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json(user.generatedComponents);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while retrieving the history of generated components.",
    });
  }
};
