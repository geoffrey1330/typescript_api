export const createUserQuery = `
    INSERT INTO users(
        email )
    VALUES ($1)
    RETURNING *
`;

export const getUserByIdQuery = `
    SELECT * FROM users WHERE id = $1
`;

export const getUserByEmailQuery = `
    SELECT * FROM users WHERE email = $1
`;

export const deleteUserByIdQuery = `
    DELETE FROM users WHERE id = $1
`;

export const createEventsQuery = `
    INSERT INTO event(
        id,
        enabled,
        user_id ) 
    VALUES ($1, $2, $3)
    RETURNING *
`;

export const updateEventsQuery = `
    UPDATE event SET
        enabled = false
    WHERE enabled = true AND user_id = $1
    RETURNING *
`;

export const updateUserConsentsQuery = `
    UPDATE users SET
        consents = $1
    WHERE id = $2
    RETURNING *
`;
export const getUserEventByUserIdQuery = `
    SELECT * FROM events WHERE user_id = $1
`;

export const getUserEventThatIsEnabledQuery = `
    SELECT * FROM events WHERE enabled = true AND user_id = $1
    RETURNING *
`;