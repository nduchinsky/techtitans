INSERT INTO USERS_TABLE (email, firstname, lastname, username, password)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;