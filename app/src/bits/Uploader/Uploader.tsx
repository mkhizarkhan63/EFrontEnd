import { observer, useLocalObservable } from 'mobx-react';
import { useDropzone } from 'react-dropzone';
import { lang } from '~/api';
import { Button, If } from '~/bits';
import { FileData, type FileDataType } from '~/models';
import { downloadAll, downloadFile } from '~/utils';

type Props = {
    description: string;
    acceptExtensions?: string[];
    canDelete?: boolean;
    isLocked?: boolean;
    isWithName?: boolean;
    canDownloadAll?: boolean;
    fileList: FileDataType[];
    isAttachmet?: boolean;
    onUpload: (file: FileDataType) => void;
    onRemove: (file: FileDataType) => void;
};

type DeleteIconProps = {
    canDelete?: boolean;
    onClick?: () => void;
};

const DeleteIcon = observer((props: DeleteIconProps) => (props.canDelete
    ? (
        <Button
            color="transparent"
            centerImg="delete"
            onClick={props.onClick}
        />
    )
    : null));

export const Uploader = observer((props: Props) => {
    const state = useLocalObservable(() => ({
        error: false,
        setError: (error: boolean) => {
            state.error = error;
        },
    }));

    const dropzone = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: props.acceptExtensions,
        onDrop: acceptedFiles => {
            acceptedFiles.forEach(file => {
                if (file.size >= 50_000_000) {
                    state.setError(true);
                    return;
                }

                state.setError(false);

                const newFile = FileData.create();

                newFile.setFile(file);
                props.onUpload(newFile);
            });
        },
    });

    const files = props.fileList.map(file => (
        <li
            className="file-list__item"
            key={file.id}
        >
            <img
                className="file-list__item-icon"
                src={file.img?.url}
                alt=" "
            />
            <If condition={() => Boolean(props.isWithName)}>
                <div className="file-list__item-text">
                    <div className="file-list__item-name">
                        {file.name}
                    </div>
                </div>
            </If>
            <div className="file-list__item-icons">
                <img
                    className="file-list__item-download"
                    src="/assets/graphics/download.svg"
                    alt="download-icon"
                    onClick={e => downloadFile(file, e)}
                />
                <DeleteIcon
                    canDelete={props?.canDelete}
                    onClick={() => props.onRemove(file)}
                />
            </div>
        </li>
    ));

    if (props.isAttachmet) {
        return (
            <div className="attachment">
                <div {...dropzone.getRootProps({ className: 'dropzone' })}>
                    <input {...dropzone.getInputProps()} />
                    <div className="attachment__btns">
                        <Button
                            color="white"
                            centerImg="attachment"
                            isCircle={true}
                            onClick={dropzone.open}
                        />
                    </div>
                </div>
                <ul className="file-list">
                    {files}
                    <If condition={() => state.error}>
                        <span className="file-list__too-large">{lang.dict.get('tooLargeFile')}</span>
                    </If>
                </ul>
            </div>
        );
    }

    return (
        <>
            <div className="uploader">
                <If condition={() => props.isLocked !== true}>
                    <div {...dropzone.getRootProps({ className: 'dropzone' })}>
                        <input {...dropzone.getInputProps()} />
                        <img
                            className="dropzone__img"
                            src="/assets/graphics/upload.svg"
                            alt="upload"
                        />
                        <span className="dropzone__desc">
                            <b className="dropzone__btn" onClick={dropzone.open}>
                                {lang.dict.get('upload')}
                            </b>
                            {props.description}
                        </span>
                    </div>
                    <If condition={() => dropzone.isDragReject}>
                        <p className="dropzone__error">
                            {lang.dict.get('badFormat')}
                        </p>
                    </If>
                </If>
            </div>
            <ul className="file-list">
                <If condition={() => Boolean(props.canDownloadAll) && props.fileList.length > 0}>
                    <div className="select-all">
                        <Button
                            color="white"
                            rightImg="download"
                            value={lang.dict.get('clientReviewsDownloadAll')}
                            onClick={downloadAll(props.fileList)}
                        />
                    </div>
                </If>
                {files}
                <If condition={() => state.error}>
                    <span className="file-list__too-large">{lang.dict.get('tooLargeFile')}</span>
                </If>
            </ul>
        </>
    );
});
