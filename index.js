const axios = require('axios');
const config = require('./config'); // Import your configuration file with API keys
const readline = require('readline');

async function paraphraseSentence(inputText) {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://paraphrasing-tool1.p.rapidapi.com/api/rewrite',
            headers: {
                "x-rapidapi-host": "paraphrasing-tool1.p.rapidapi.com",
                "x-rapidapi-key": config.paraphrasingToolRapidAPIKey,
                "content-type": "application/json",
                "accept": "application/json",
                "useQueryString": true
            },
            data: { "sourceText": inputText }
        });

        return response.data; // Return the paraphrased text
    } catch (error) {
        console.error("Error while paraphrasing:", error.response.data);
        throw new Error("Paraphrasing failed");
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a sentence to paraphrase: ', async (inputText) => {
    rl.question('Enter the paraphrasing option (Professional, Creative, Urgent): ', async (paraphraseOption) => {
        if (!paraphraseOption) {
            console.error("Error: No paraphrasing option selected.");
            rl.close();
            return;
        }

        try {
            const paraphrasedText = await paraphraseSentence(inputText);
            console.log("Original Sentence:", inputText);
            console.log("Paraphrased Sentence:", paraphrasedText);
        } catch (err) {
            console.error("Paraphrasing failed:", err.message);
        } finally {
            rl.close();
        }
    });
});


