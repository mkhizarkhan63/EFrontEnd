import { observer } from 'mobx-react';
import type { FileDataType } from '~/models';
import { downloadFile } from '~/utils';

type Props = {
    files: FileDataType[];
    isSelectAll?: boolean;
};

export const FileList = observer((props: Props) => {
    const files = props.files.map(file => (
        <li
            className="drawings-list__item"
            data-select={props.isSelectAll}
            key={file.id}
        >
            <img
                className="drawings-list__item-doc-icon"
                src="/assets/graphics/document.svg"
                alt="document"
            />
            <p className="drawings-list__item-name">{file.name}</p>
            <div className="drawings-list__item-icons">
                <img
                    className="drawings-list__item-download"
                    src="/assets/graphics/download.svg"
                    alt="download-icon"
                    onClick={e => downloadFile(file, e)}
                />
            </div>
        </li>
    ));

    return <ul className="drawings-list">{files}</ul>;
});
