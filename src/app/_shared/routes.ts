export const Routes = {
    root: '',
    bookmarks: {
        root: '/bookmarks',
        create: '/bookmarks/create',
        edit: (id: number) => `/bookmarks/edit/${id}`
    }
}