const projects = require('../projects');
const path = require('path');
const jetpack = require('fs-jetpack');

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

    console.log(`Cloning repository: ${project.githubUrl}`);
    await jetpack.remove(localRepositoryPath);
    await git.clone(`${project.githubUrl}.git`, localRepositoryPath, {
        '--branch': 'master',
        '--single-branch': true,
        '--depth': 1
    });
    const docsPath = path.resolve(localRepositoryPath, 'docs');
    await jetpack.copy(docsPath, finalDocsPath, {overwrite: true});
    console.log(`Done`);
}

(async () => {
    for (const project of projects) {
        await handleProject(project);
    }
})();
