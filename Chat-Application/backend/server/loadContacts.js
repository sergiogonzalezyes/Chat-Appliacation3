app.get("/loadContacts", (req, res) => {
    const userId = req.query.userId;
    // retrieve the contacts list for the specified user from the database
    const contacts = database.getContacts(userId);
    res.json(contacts);
});
