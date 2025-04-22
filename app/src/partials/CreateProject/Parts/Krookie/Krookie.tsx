import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Uploader } from '~/bits';
import { stores } from '~/stores';

export const Krookie = observer(() => {
    const { draft } = stores.projects;

    return (
        <Uploader
            description={lang.dict.get('projectCreatorUploadKrookie')}
            acceptExtensions={['application/pdf', 'image/*']}
            fileList={draft.krookieFiles}
            onUpload={draft.uploadKrookieFile}
            onRemove={draft.removeKrookieFile}
            canDelete={true}
            canDownloadAll={true}
            isWithName={true}
        />
    );
});
