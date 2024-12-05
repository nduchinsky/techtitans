SELECT id, title, description, price, condition, tags, created_at, address1, address2, city, state, zip, user_id
FROM LISTINGS_TABLE
WHERE
    (condition ILIKE $1 OR $1 IS NULL) AND
    (tags ILIKE $2 OR $2 IS NULL) AND
    (title ILIKE $3 OR $3 IS NULL);