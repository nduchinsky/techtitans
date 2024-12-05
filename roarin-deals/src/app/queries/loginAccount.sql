SELECT id, email, firstname, lastname, username
FROM USERS_TABLE
WHERE email = $1 AND password = $2;