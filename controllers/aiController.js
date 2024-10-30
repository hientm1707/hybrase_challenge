exports.retrieveInfo = async (req, res) => {
    const { query } = req.body;
    // Integrate with AI service to process the query
    const result = await getAIResponse(query);
    res.json({ result });
};