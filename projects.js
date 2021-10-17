const data = [
    {
        name: 'app-env',
    },
    {
        name: 'cascade',
        apiFiles: [
            'compiled/Rule.d.ts',
            'compiled/Action.d.ts',
            'compiled/Manager.d.ts'
        ]
    }
]

module.exports = data.map(x => {
    return {
        ...x,
        githubUrl: x.githubUrl ?? `https://github.com/pallad-ts/${x.name}`,
        npmPackageName: `@pallad/${x.name}`
    };
});