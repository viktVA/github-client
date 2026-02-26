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
        mask: "/repositories/:id",
        create: (id: string) => `/repositories/${id}`,
    },
}