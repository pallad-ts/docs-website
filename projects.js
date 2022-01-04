const _ = require('lodash');

const data = [
    {
        name: 'config',
        hasDocs: true,
        description: 'Create type-safe configuration'
    },
    {
        name: 'app-env',
        displayName: 'App environment',
        description: 'Detect environment like: prod, test or more and adapt to it'
    },
    {
        name: 'cascade',
        description: 'Run cascade actions from your code instead database'
    },
    {
        name: 'entity-ref',
        displayName: 'Entity reference',
        description: 'Create small references to entities'
    },
    {
        name: 'secret',
        description: 'Prevent your secrets from accidental leak'
    },
    {
        name: 'range',
        description: 'Range structure'
    },
    {
        name: 'compare',
        description: 'Custom sorting library inspired by Rust'
    },
]

module.exports = data.map(x => {
    return {
        ...x,
        githubUrl: x.githubUrl ?? `https://github.com/pallad-ts/${x.name}`,
        npmPackageName: `@pallad/${x.name}`,
        displayName: x.displayName ?? _.upperFirst(x.name)
    };
});
