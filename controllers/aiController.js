const knowledgeBase = [
    { id: 1, question: "What is the deadline for project X?", answer: "The deadline is December 31, 2024." },
    { id: 2, question: "Who is assigned to task Y?", answer: "Task Y is assigned to John Doe." },
];

exports.retrieveInfo = async (req, res) => {
    const query = req.query.q; // Get query from query parameters
    // Here, you would use an NLP model to process the query
    const response = knowledgeBase.find(item => item.question.toLowerCase().includes(query.toLowerCase()));

    if (response) {
        return res.json({answer: response.answer});
    } else {
        return res.status(404).json({error: "No information found."});
    }
};