const projects = require('../projects');
const path = require('path');
const fs = require('fs')
const jetpack = require('fs-jetpack');

async function handleProject(project) {
    console.log(`Project ${project.name}`);

    const packagePath = path.resolve(__dirname, '..', 'node_modules', '@pallad', project.name);
    const docsPath = path.resolve(packagePath, 'docs');
    if (!fs.existsSync(docsPath)) {
        console.error(`No docs for ${project.npmPackageName}`);
        return;
    }

    console.log(`Copying docs for ${project.name}`)
    const finalDocsPath = path.resolve(__dirname, '..', 'projects', project.name, 'docs');
    await jetpack.copy(docsPath, finalDocsPath, {overwrite: true});
    console.log(`Done`);

    if (project.apiFiles) {
        console.log('Generating API docs');
        const apiDocsPath = path.resolve(finalDocsPath, 'API');
        jetpack.dir(apiDocsPath);
        for (const file of project.apiFiles) {
            console.log(`Generating API docs for file ${file}`);
            const apiFilePath = path.resolve(packagePath, file);
            const baseFileName = path.basename(apiFilePath, '.d.ts');

            fs.writeFileSync(
                path.resolve(apiDocsPath, baseFileName + '.md'),
                `#${baseFileName}
\`\`\`typescript
${fs.readFileSync(apiFilePath, 'utf8')}
\`\`\`
`
            );
        }
    }
}

(async () => {
    for (const project of projects) {
        await handleProject(project);
    }
})();
