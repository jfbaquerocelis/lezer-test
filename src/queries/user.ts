export const userQuery = {
  query: `
    {
      viewer {
        name
        repositories(first: 10) {
          nodes {
            id
            name
            description
            url
          }
        }
      }
    }
  `
};