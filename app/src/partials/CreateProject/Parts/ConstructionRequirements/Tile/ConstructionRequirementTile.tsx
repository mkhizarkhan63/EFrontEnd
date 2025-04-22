import { observer } from 'mobx-react';
import type { MouseEvent } from 'react';
import { lang } from '~/api';

const handlePreviewClick = (onOpenPreview: () => void) => (event: MouseEvent) => {
    event.stopPropagation();
    onOpenPreview();
};

export const ConstructionRequirementTile = observer((props: {
    requirement: 'structureOnly' | 'turnKey';
    title: string;
    subtitle: string;
    isSelected: boolean;
    onSelect: () => void;
    onOpenPreview: () => void;
}) => (
    <div
        className="requirement-tile"
        data-requirement={props.requirement}
        data-is-selected={props.isSelected}
        onClick={props.onSelect}
    >
        <div className="bottom">
            <div
                className="bottom__radio"
            />
            <div className="bottom__titles">
                <div className="bottom__titles-primary">
                    {props.title}
                </div>
                <div className="bottom__titles-secondary">
                    {props.subtitle}
                </div>
            </div>
            <button
                className="bottom__tip-button"
                onClick={handlePreviewClick(props.onOpenPreview)}
            >
                {lang.dict.get('moreDetails')}
            </button>
        </div>
    </div>
));
