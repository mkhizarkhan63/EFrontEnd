import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';
import type { CreateProjectClientVm } from '../CreateProjectClient.vm';
import { ConstructionRequirements } from '../Parts';

export const FourthStep = observer(({ vm }: { vm: CreateProjectClientVm }) => (
    <div className="construction-requirements">
        <ConstructionRequirements />
        <div className="navigation">
            <div className="navigation__row-btns">
                <Button
                    color="blue"
                    value={lang.dict.get('submitProject')}
                    onClick={vm.addToReview}
                    rightImg="next"
                />
            </div>
        </div>
    </div>
));
