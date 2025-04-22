import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { defaultDict } from '~/api/Lang/Dict/Default';
import { Button, Icons, If, Input, SortedTable, Uploader } from '~/bits';
import { BuyProjectsVm } from '../../BuyProjects.vm';
import { hook } from '~/utils';

type Props = {
    parentVm: BuyProjectsVm;
};

export const ProjectDocuments = observer(({ parentVm }: Props) => {

    return (
        <>

            <div className='project-creator_cards_container__body_content'>
                <div className="project-documents">
                    <p className='project-documents_content'>{lang.dict.get('projectDocumentContent')}</p>


                    {/* project drawings */}
                    <div className='section'>
                        <div className="form__section-field">
                            {lang.dict.get('projectDrawings')}
                        </div>
                        <Uploader
                            description={lang.dict.get('uploadProjectDrawings')}
                            fileList={parentVm.projectDrawingFile}
                            onUpload={parentVm.uploadProjectDrawing}
                            onRemove={parentVm.removingProjectDrawing}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />
                    </div>

                    {/* project documents */}
                    <div className='section'>
                        <div className="form__section-field">
                            {lang.dict.get('projectDocuments')}
                        </div>
                        <Uploader
                            description={lang.dict.get('uploadProjectDocuments')}
                            fileList={parentVm.projectDocumentFile}
                            onUpload={parentVm.uploadProjectDocuments}
                            onRemove={parentVm.removingProjectDocuments}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />
                    </div>

                    {/* marketing broucher */}
                    <div className='section'>
                        <div className="form__section-field">
                            {lang.dict.get('marketingBrochure')}
                        </div>
                        <Uploader
                            description={lang.dict.get('uploadMarketingBrochure')}
                            fileList={parentVm.marketingBroucherFile}
                            onUpload={parentVm.uploadMarketingBroucher}
                            onRemove={parentVm.removingMarketingBroucher}
                            canDelete={true}
                            canDownloadAll={true}
                            isWithName={true}
                        />
                    </div>
                    {/* projectVideoLink */}
                    <div className='section'>
                        <Input.Text name={lang.dict.get('projectVideoLink')}

                            placeHolder={lang.dict.get('writeURL')}
                        />

                    </div>

                </div>
            </div>

        </>
    );
})