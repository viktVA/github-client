
export const workDate = (dateString: string) => {
    return (
        new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    );
}