const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// API endpoint for Claude messages
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, maxTokens, temperature, apiKey } = req.body;

        const response = await new Anthropic({
            apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
        }).messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: maxTokens,
            temperature: temperature,
            messages: messages,
        });

        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});