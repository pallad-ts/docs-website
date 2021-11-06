import React from 'react';

export function NPMBadge({project, withLink}) {
    const imgURL = `https://badge.fury.io/js/${encodeURIComponent(project.npmPackageName)}.svg`
    const content = <img
        src={imgURL}
        alt="npm version"
        data-canonical-src={imgURL}
    />;

    if (withLink) {
        const packageURL = `https://www.npmjs.com/package/${project.npmPackageName}`;

        return <a href={packageURL}>{content}</a>
    }
    return content;
}
