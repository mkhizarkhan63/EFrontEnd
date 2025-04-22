import { E, ErrorListHolder, restQuery, T } from '~/api';
import { stores } from '~/stores';
import type { ProjectDesignVm } from '../../ProjectDesign.vm';

const struct = (commentsAdditional: string) => T.type({
    ...commentsAdditional.length > 0 ? { commentsAdditional: T.name() } : {},
});

export class EditDetailsVm {
    isLoading = false;

    commentsAdditional = '';

    errorListHolder = new ErrorListHolder(
        () => this,
        () => struct(this.commentsAdditional),
    );

    constructor(readonly itemVm: ProjectDesignVm) {
        makeSafeObservable(this, {
            isLoading: false,
        });
    }

    get isEditable() {
        if (!this.itemVm.project.projectStatus) {
            return false;
        }

        return [
            E.ProjectStatus.draft,
            E.ProjectStatus.none,
        ].includes(this.itemVm.project.projectStatus);
    }

    test = () => this.errorListHolder.test();

    save = () => {
        (async () => {
            if (this.isLoading || !this.test()) {
                return;
            }

            this.isLoading = true;

            await restQuery.admin.setDecisionDesign(
                this.itemVm.project.id,
                true,
                this.commentsAdditional,
            );

            this.isLoading = false;

            stores.display.router.reload();
        })();
    };

    reject = () => {
        (async () => {
            if (this.isLoading || !this.test()) {
                return;
            }

            this.isLoading = true;

            await restQuery.admin.setDecisionDesign(
                this.itemVm.project.id,
                false,
                this.commentsAdditional,
            );

            this.isLoading = false;

            stores.display.router.reload();
        })();
    };

    setComment = (comment: string) => {
        this.commentsAdditional = comment;
    };

    goToDesign = () => {
        const { designId } = this.itemVm.project;

        if (!designId || designId.isType('internal')) {
            return;
        }

        stores.designs.openDesign(designId.asNumber());
    };
}
