import { observer } from 'mobx-react';
import { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { E, Env, lang } from '~/api';
import { Button, If } from '~/bits';
import { ProfileRegistrationVm } from '~/views/ProfileRegistration/ProfileRegistration.vm';

type Props = {
    vm: ProfileRegistrationVm;
};

type CanvasRef = Record<string, (
    fileType?: string,
    useBgImage?: boolean,
    backgroundColor?: string,
) => string>;

export const Signature = observer(({ vm }: Props) => {
    const canvasRef = useRef<CanvasDraw>(null);

    const changeSignature = () => {
        if (!canvasRef.current) {
            return;
        }

        const dataUrl = (canvasRef.current as unknown as CanvasRef).getDataURL();
        vm.setSignature(dataUrl);
    };

    const clearSignature = () => {
        if (!canvasRef.current) {
            return;
        }

        (canvasRef.current as unknown as CanvasRef).clear();
        vm.setSignature();
    };

    return (
        <div className="right-panel__signature">
            <div className="right-panel__signature-header">
                <p className="right-panel__signature-header-text">
                    {lang.dict.get('addSignatures')}
                </p>
                <Button
                    color="transparent"
                    value={lang.dict.get('clear')}
                    onClick={clearSignature}
                />
            </div>
            <div className="right-panel__signature-canvas">
                <CanvasDraw
                    brushRadius={0.4}
                    lazyRadius={1}
                    hideGrid={true}
                    enablePanAndZoom={true}
                    onChange={changeSignature}
                    ref={canvasRef}
                />
            </div>
            <div className='right-panel__signature-footer'>
                <p>{lang.dict.get('drawSignature')}</p>
            </div>
        </div>
    );
});