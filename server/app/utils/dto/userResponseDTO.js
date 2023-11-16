export const userResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        bio: user.bio,
        email: user.email,
        verified: user.verified,
        birthdate: user.birthdate,
        gender: user.gender,
        profileImage: user.profileImage,
        role: user.role,
        createdAt: user.createdAt
    }
}

export const usersResponse = (users) => {
    return users.map(user => userResponse(user));
}