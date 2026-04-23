export const routes = {
    main: {
        mask: "/",
        create: () => "/",
    },
    repositories: {
        mask: "/repositories",
        create: () => "/repositories",
    },
    repository: {
        mask: "/repositories/:owner/:name",
        create: (owner: string, name: string) => `/repositories/${owner}/${name}`,
    },
}