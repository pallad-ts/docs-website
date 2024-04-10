const projects = require('../projects');
const path = require('path');
const jetpack = require('fs-jetpack');
const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();

async function handleProject(project) {
    if (!project.hasDocs) {
        return;
    }

    console.log(`Copying docs for ${project.name}`)
    const finalDocsPath = path.resolve(__dirname, '..', 'projects', project.name, 'docs');
    await jetpack.remove(finalDocsPath);

    const localRepositoryPath = path.resolve(__dirname, '..', 'repositories', project.name);

    if (fs.existsSync(localRepositoryPath)) {
        console.log('Locale repository path exists');
        const localRepositoryInfo = fs.lstatSync(localRepositoryPath);

        if (localRepositoryInfo.isSymbolicLink()) {
            console.warn(`Local repository for project: ${project.githubUrl} is a symbolic link - Ignoring`);
        }
    } else {
        console.log(`Cloning repository: ${project.githubUrl}`);
        await jetpack.remove(localRepositoryPath);
        await git.clone(`${project.githubUrl}.git`, localRepositoryPath, {
            '--branch': 'master',
            '--single-branch': true,
            '--depth': 1
        });
    }
    const docsPath = path.resolve(localRepositoryPath, 'docs');
    await jetpack.copy(docsPath, finalDocsPath, {overwrite: true});
}

(async () => {
    for (const project of projects) {
        await handleProject(project);
    }
    console.log('Done');
})();
