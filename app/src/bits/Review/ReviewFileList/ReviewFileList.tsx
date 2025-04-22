import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If } from '~/bits';
import type { FileDataType } from '~/models';
import { downloadAll } from '~/utils';

type Props = {
    krookies: FileDataType[];
    drawingsFiles?: FileDataType[];
    onDelete?: (id: FileDataType) => void;
};

type FileListProps = {
    files: FileDataType[];
    onDelete?: (id: FileDataType) => void;
    isRemovable?: boolean;
};

const FileList = observer(({ files, onDelete, isRemovable = false }: FileListProps) => {
    if (files.length === 0) {
        return null;
    }

    const list = files.map(img => (
        <div key={img.id} className="reviews-files__item">
            <div className="reviews-files__item-doc-icon">
                <img
                    className="file-list__item-icon"
                    src={img?.img?.url}
                    alt=""
                />
            </div>
            <p className="reviews-files__name">{img.name}</p>
            <If condition={isRemovable}>
                <Button
                    color="transparent"
                    centerImg="delete"
                    onClick={() => onDelete?.(img)}
                />
            </If>
        </div>
    ));

    return <>{list}</>;
});

export const ReviewFileList = observer(({ krookies, drawingsFiles = [], onDelete }: Props) => {
    if (krookies.length === 0) {
        return null;
    }

    const allFiles = [...krookies, ...drawingsFiles];

    return (
        <div className="reviews-files">
            <div className="reviews-files__container">
                <FileList
                    files={krookies}
                    onDelete={onDelete}
                />
                <FileList
                    files={drawingsFiles}
                    onDelete={onDelete}
                    isRemovable={true}
                />
            </div>
            <div className="reviews-files__btn">
                <Button
                    color="white"
                    rightImg="download"
                    value={lang.dict.get('clientReviewsDownloadAll')}
                    onClick={downloadAll(allFiles)}
                />
            </div>
        </div>
    );
});
