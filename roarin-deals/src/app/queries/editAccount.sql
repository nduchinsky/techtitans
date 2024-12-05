UPDATE USERS_TABLE
SET email = COALESCE($1, email),
    firstname = COALESCE($2, firstname),
    lastname = COALESCE($3, lastname),
    username = COALESCE($4, username),
    password = COALESCE($5, password)
WHERE id = $6
RETURNING *;