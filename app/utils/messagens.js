class Message {
    s001(field) {
        return `${field} - campo obrigatório.`;
    }
}

module.exports = new Message;
