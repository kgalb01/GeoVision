document.getElementById('chatbot-send').addEventListener('click', function() {
    const input = document.getElementById('chatbot-input').value;
    if (input.trim() === '') return;
    addMessage('user', input);
    const query = processQuery(input);
    getWikipediaAnswer(query);
    document.getElementById('chatbot-input').value = '';
});

document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('chatbot-send').click();
    }
});

function addMessage(sender, text) {
    const messageContainer = document.getElementById('chatbot-messages');
    const message = document.createElement('div');
    message.classList.add('chatbot-message', `${sender}-message`);
    message.textContent = text;
    messageContainer.appendChild(message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function processQuery(query) {
    const cleanedQuery = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const stopWords = ['what', 'is', 'the', 'a', 'an', 'of', 'in', 'on', 'for', 'with', 'to', 'and', 'or', 'from'];
    const words = cleanedQuery.split(' ').filter(word => !stopWords.includes(word));
    return words.join(' ');
}

function getWikipediaAnswer(query) {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                addMessage('bot', data.extract);
            } else {
                addMessage('bot', 'Sorry, I could not find an answer on Wikipedia.');
            }
        })
        .catch(error => {
            addMessage('bot', 'There was an error processing your request.');
            console.error('Error:', error);
        });
}
