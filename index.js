const { Filter } = require('content-checker');
const dotenv = require('dotenv');
const { JSDOM } = require('jsdom');

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.OPEN_MODERATOR_API_KEY;

if (!apiKey) {
    console.error('API key not found. Please add it to the .env file.');
}

// Create a simulated browser environment
const { window } = new JSDOM();
const { document } = window;

// Standard Text Moderation
const filter = new Filter();
console.log(filter.clean("Don't be an ash0le")); // Don't be an ******

// Placeholder Overrides
const customFilter = new Filter({ placeHolder: 'x' });
console.log(customFilter.clean("Don't be an ash0le")); // Don't be an xxxxxx

// Regex Overrides
const regexFilter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g });
console.log(regexFilter.clean("Don't be an ash0le")); // Don't be an ******

// Add words to the blacklist
filter.addWords('some', 'bad', 'word');
console.log(filter.clean('some bad word!')); // **** *** ****!

// Instantiate with an empty list
const emptyListFilter = new Filter({ emptyList: true });
console.log(emptyListFilter.clean('hell this wont clean anything')); // hell this wont clean anything

// Remove words from the blacklist
filter.removeWords('some', 'bad', 'word');
console.log(filter.clean('some bad word!')); // some bad word!

// AI Text Moderation
const aiFilter = new Filter({ openModeratorAPIKey: apiKey });
aiFilter.isProfaneAI('your string here').then(response => {
    if (response.profane) {
        console.log('Profanity found. Types: ', response.type.join(', '));
    } else {
        console.log('No profanity found');
    }
});

// AI Image Moderation
const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/png, image/jpeg';

imageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const response = await aiFilter.isImageNSFW(file);
            if (response.nsfw) {
                console.log('NSFW content detected. Types:', response.type.join(', '));
            } else {
                console.log('Image is safe.');
            }
        } catch (error) {
            console.error('Error checking image:', error);
        }
    }
});

document.body.appendChild(imageInput);