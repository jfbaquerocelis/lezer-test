export const github = {
    baseURL: "https://api.github.com/graphql",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    }
}
