import { observer } from 'mobx-react';
import { describe, it, mount, cy } from '~cypress';
import { Uploader } from '~/bits';
import { ProjectDraft } from '~/models';

const FILE_PDF = 'example.pdf';
const FILE_PNG = 'type.png';

const createObservedUploader = (fileExtensions: string[], draft: ProjectDraft) => observer(() => (

    <Uploader
        description="opis"
        acceptExtensions={fileExtensions}
        fileList={draft.krookieFiles}
        onUpload={draft.uploadKrookieFile}
        onRemove={draft.removeKrookieFile}
        canDelete={true}
        canSelect={true}
    />
));

describe('bits/Uploader', () => {
    it('have to add only .png', () => {
        const ObservedUploader = createObservedUploader(['.png'], new ProjectDraft());

        mount(() => <ObservedUploader />);

        cy.get('input').attachFile(FILE_PNG);

        cy.get('input').attachFile(FILE_PDF);

        cy.get('li').should('have.length', 1);
    });

    it('have to add png && pdf', () => {
        const ObservedUploader = createObservedUploader(['.pdf', '.png'], new ProjectDraft());

        mount(() => <ObservedUploader />);

        cy.get('input').attachFile(FILE_PNG);

        cy.get('input').attachFile(FILE_PDF);

        cy.get('li').should('have.length', 2);
    });

    it('have to remove the second element', () => {
        const ObservedUploader = createObservedUploader(['.pdf', '.png'], new ProjectDraft());

        mount(() => <ObservedUploader />);

        cy.get('input').attachFile(FILE_PNG);

        cy.get('input').attachFile(FILE_PDF);

        cy.get('li').should('have.length', 2);

        cy.get('li').eq(1).find('div[data-icon-name="delete"]').click();

        cy.get('li').should('have.length', 1);
    });
});
