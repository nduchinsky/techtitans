UPDATE posts
SET title = COALESCE($1, title),
    description = COALESCE($2, description),
    price = COALESCE($3, price),
    condition = COALESCE($4, condition),
    tags = COALESCE($5, tags),
    address1 = COALESCE($6, address1),
    address2 = COALESCE($7, address2),
    city = COALESCE($8, city),
    state = COALESCE($9, state),
    zip = COALESCE($10, zip)
WHERE id = $11
RETURNING *;