import type { PropsWithChildren } from 'react';

export const ProjectsGrid = (props: PropsWithChildren<{
    isLoading: boolean;
}>) => (
    <div className="projects">
        <div
            className="grid"
            key="projects"
        >
            {props.children}
        </div>
        <div
            className="grid loading-grid"
            key="loading"
            data-is-visible={props.isLoading}
        >
            <div className="skeleton-tile" />
            <div className="skeleton-tile" />
            <div className="skeleton-tile" />
            <div className="skeleton-tile" />
            <div className="skeleton-tile" />
            <div className="skeleton-tile" />
        </div>
    </div>
);
