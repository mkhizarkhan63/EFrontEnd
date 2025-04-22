import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, If, Uploader } from '~/bits';
import { FileData, type FileDataType } from '~/models';

export type PropsUploader = {
    files: FileDataType[];
    addFile: (file: FileDataType) => void;
    removeFile: (file: FileDataType) => void;
};

export const UploaderImages = observer(({ files, addFile, removeFile }: PropsUploader) => {
    const numOfPossibilities = Math.max(9 - files.length, 0);

    const staticFile = Array(numOfPossibilities).fill(0)
        .map(() => FileData.create());

    const images = [...files, ...staticFile].map(img => (
        <div key={img.id}>
            <If condition={() => !img.hasImg}>
                <Uploader
                    description={lang.dict.get('fieldCompanyUploader')}
                    acceptExtensions={['image/*']}
                    fileList={[]}
                    onUpload={addFile}
                    onRemove={removeFile}
                />
            </If>
            <If condition={() => img.hasImg}>
                <div className="uploader">
                    <img
                        className="uploader__uploaded-img"
                        src={img.img?.url}
                        alt="Company Logo"
                    />
                    <div className="uploader__remove-img">
                        <Button
                            centerImg="close"
                            onClick={() => removeFile(img)}
                            color="gray"
                            isCircle={true}
                            hasOutline={true}
                        />
                    </div>
                </div>
            </If>
        </div>
    ));

    return <>{ images }</>;
});
