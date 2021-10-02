db.createUser(
    {
        user: "application_user",
        pwd: "application_pass",
        roles: [
            {
                role: "readWrite",
                db: "movielib"
            }
        ]
    }
)
