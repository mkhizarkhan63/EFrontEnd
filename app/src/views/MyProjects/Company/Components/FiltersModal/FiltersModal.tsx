import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Close, Input, SideModal } from '~/bits';
import { stores } from '~/stores';

type Props = {
    closeModal: VoidFunction;
    clearFilters: VoidFunction;
    filters: FilterConsultant;
    setFilter: (key: string, value: string | number) => void;
};

type FilterConsultant = {
    projectType?: E.ProjectStartingStep;
    governorateCollection?: number;
};

type Enums = typeof E.ProjectStartingStep;

const selectOptions = (select: Enums) => Object.keys(select)
    .filter(key => key !== 'none')
    .map(key => ({
        value: key,
        name: lang.dict.get(key),
    }));

const governoratesList = () => stores.locations.governorates
    .map(item => ({
        value: item.id.asNumber(),
        name: item.displayName,
    }));

export const FiltersModal = observer(({ setFilter, closeModal, clearFilters, filters }: Props) => (
    <SideModal onBlur={closeModal} variant="filters">
        <div className="side-modal__header">
            <Close onClick={closeModal} />
            <p className="side-modal__header-title">
                {lang.dict.get('filterProjectsBy')}
            </p>
        </div>
        <div className="side-modal__content">
            <Input.Select
                name={lang.dict.get('governorate')}
                value={filters.governorateCollection}
                values={governoratesList()}
                onChange={value => setFilter('governorateCollection', value)}
            />
            <Input.Select
                name={lang.dict.get('projectCreatorProjectType')}
                value={filters.projectType}
                values={selectOptions(E.ProjectStartingStep)}
                onChange={value => setFilter('projectType', value)}
            />
        </div>
        <Button
            color="white"
            value={lang.dict.get('clearFilters')}
            onClick={clearFilters}
        />
    </SideModal>
));
