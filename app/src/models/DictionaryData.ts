import { makeAutoObservable } from 'mobx';
import { Id, lang, type E } from '~/api';

export class DictionaryData {
    id = Id.init();

    altDisplayName = '';

    translationKey = '';

    systemName = '';

    type?: E.ResourceType;

    constructor() {
        makeAutoObservable(this);
    }

    get displayName() {
        const translated = lang.dict.get(['backend', this.translationKey]);

        if (!translated || !this.translationKey) {
            return this.altDisplayName;
        }

        return translated;
    }

    get iconPath() {
        switch (this.systemName) {
            case 'ArchitecturalDesign':
                return '/assets/graphics/architectural_design.svg';
            case 'MepDesign':
                return '/assets/graphics/mep_design.svg';
            case 'StructuralDesign':
                return '/assets/graphics/structural_design.svg';
            case 'AuthorityApprovals':
                return '/assets/graphics/authority_approvals.svg';
            case 'ExteriorTDDesign':
                return '/assets/graphics/exterior_design.svg';
            case 'LandscapeDesign':
                return '/assets/graphics/landscape_design.svg';
            case 'QuantitySurveying':
                return '/assets/graphics/quantity_surveying.svg';
            case 'InteriorDesign':
                return '/assets/graphics/interior_design.svg';
            case 'Surveying':
                return '/assets/graphics/surveying.svg';
            default:
                return '/assets/graphics/architectural_design.svg';
        }
    }
}
