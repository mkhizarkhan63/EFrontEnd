import { useEffect } from 'react';
import { CreateProjectAdmin } from '~/partials';
import { stores } from '~/stores';

export const ProjectCreator = () => {
    useEffect(() => {
        stores.projects.resetDraft();
    }, []);

    return <CreateProjectAdmin renderWithPage={true} />;
};
