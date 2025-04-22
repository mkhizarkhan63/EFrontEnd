import { dtos, Mobx, Id, type Paging } from '~/api';
import { type Project, Note } from '~/models';

export const getProjectNotes = async (project: Project, paging?: Paging) => {
    const data = await dtos
        .profile
        .execListNoteByProjectIdQuery({
            constructionProjectId: project.id.asNumber(),
        });

    if (!data) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 1);

    return data.result
        .map(item => {
            const itemNote = new Note();

            Mobx.extendsObservable(itemNote, {
                id: Id.tryInit(item.id, 'external'),
                projectId: Id.tryInit(item.constructionProjectId, 'external'),
                text: item.noteContent,
            });

            return itemNote;
        });
};
