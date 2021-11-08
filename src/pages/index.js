import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import * as projects from '../../projects';
import {NPMBadge} from "../NPMBadge/GithubBadge";
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from "@docusaurus/theme-common";
import ThemedImage from '@theme/ThemedImage';


function displayProject(project, index) {
    return <ProjectInfo project={project} key={index}/>
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();

    const {
        navbar: {title: navbarTitle, logo = {src: ''}},
    } = useThemeConfig();
    const logoSources = {
        light: useBaseUrl(logo.src),
        dark: useBaseUrl(logo.srcDark || logo.src),
    };

    return (
        <Layout
            title={`Pallad - High quality typescript libraries`}>
            <main>
                <div className={styles.hero}>
                    <ThemedImage sources={logoSources} alt="" />
                    <h1 className={styles.heroTitle}>Pallad</h1>
                    <div className={styles.heroSubtitle}>High quality Typescript libraries</div>
                </div>

                <div className={styles.projects}>
                    <div className={styles.promotedProjects}>
                        {projects.filter(x => x.hasDocs).map(displayProject)}
                    </div>
                    <div className={styles.smallerProjects}>
                        {projects.filter(x => !x.hasDocs).map(displayProject)}
                    </div>
                </div>
            </main>
        </Layout>
    );
}


function ProjectInfo({project}) {
    const link = project.hasDocs ? '/' + project.name:project.githubUrl;

    return <article className={styles.projectInfo} data-with-docs={project.hasDocs}>
        <a href={link} className={styles.projectIntoLink}>
            <h1 className={styles.projectInfoTitle}>{project.displayName}</h1>
        </a>
        <div className={styles.projectDescription}>
            {project.description}
        </div>
        <div className={styles.projectBadges}>
            <NPMBadge project={project} withLink/>
        </div>
    </article>
}
