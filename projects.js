const data = [
    {
        name: 'app-env',
    },
    {
        name: 'cascade',
    }
]

module.exports = data.map(x => {
    return {
        ...x,
        githubUrl: x.githubUrl ?? `https://github.com/pallad-ts/${x.name}`
    };
});