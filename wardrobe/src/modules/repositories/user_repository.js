export async function fetchRefreshToken(tokenKey) {
    try {
        const res = await fetch(
            "http://127.0.0.1:8000/api/v1/user/refresh",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenKey}`,
                },
            }
        )
        if (!res.ok) return null

        const json = await res.json()

        return {
            username: json.message.username,
            email: json.message.email,
            role: json.role,
        }
    } catch (error) {
        console.error("refresh token error:", error)
        return null
    }
}