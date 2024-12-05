INSERT INTO LISTINGS_TABLE (title, description, price, condition, tags, address1, address2, city, state, zip, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;