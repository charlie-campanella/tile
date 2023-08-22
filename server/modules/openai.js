/**
 * @file modules/openai.js
 * @description Module for integrating with the OpenAI API
 * @module modules/openai
 */

/* Third Party Dependencies */
const { Configuration, OpenAIApi } = require("openai");

/* Local Dependencies */
const credentials = require('./credentials');

// Configure the OpenAI API
const configuration = new Configuration({
    apiKey: credentials.openai.secretKey,
});
const openai = new OpenAIApi(configuration);

/**
 * Generates HTML/Javascript code for a tile based on its functionality description
 * 
 * @param {description} description 
 * @returns {String} Generated code
 */
const generateTileCode = async (description) => {
    const prompt = `
    You are a system which generates HTML/Javascript code for a small application ("tile") based on its description.

    Description:
    ${description}

    Rules:
    - The application must be written in vanilla HTML/Javascript
    - Application UI must be responsive and centered
    - Background color must be white
    - Never use APIs that require an API key. APIs should always be free and open source.
    - Local state should be persisted in LocalStorage
    - You only return the code without explanations or additional comments
    - Your output always begins with "<!DOCTYPE html>" and ends with "</html>"

    Code:
    `;
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{role: "system", content: prompt}],
    });

    return chatCompletion.data.choices[0].message.content || null;
};

module.exports = {
    generateTileCode
};

