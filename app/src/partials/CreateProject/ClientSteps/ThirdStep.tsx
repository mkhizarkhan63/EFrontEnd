import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button } from '~/bits';
import { preventDefault } from '~/utils';
import type { CreateProjectClientVm } from '../CreateProjectClient.vm';
import { Designs } from '../Parts';

export const ThirdStep = observer(({ vm }: { vm: CreateProjectClientVm }) => (
    <div className="project-creator" data-is-admin="false">
        <form className="form" onSubmit={preventDefault(() => vm.goNext(E.ProjectStep.third))}>
            <Designs />
            <div className="form__bottom-buttons">
                <Button
                    color="blue"
                    value={lang.dict.get('goNext')}
                    rightImg="next"
                    onClick={() => vm.goNext(E.ProjectStep.fourth)}
                    isLoading={vm.isSaving}
                    isSubmit={true}
                />
            </div>
        </form>
    </div>
));
