import { type PropsWithChildren, type ComponentProps, forwardRef } from 'react';
import { Subheader, ProcessWizard } from '~/bits';
import { Page } from '../Page/Page';

type Props = PropsWithChildren<{
    subheader: Omit<ComponentProps<typeof Subheader>, 'children'>;
    subheaderContent: ComponentProps<typeof Subheader>['children'];
    stepWizard?: Omit<ComponentProps<typeof ProcessWizard>, 'children'>;
    stepWizardContent?: ComponentProps<typeof ProcessWizard>['children'];
}>;

export const PageWithWizard = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const stepWizard = props.stepWizard ?
        (
            <Subheader.Bottom>
                <ProcessWizard {...props.stepWizard}>
                    {props.stepWizardContent}
                </ProcessWizard>
            </Subheader.Bottom>
        )
        : null;

    return (
        <Page>
            <div className="subheader-type subheader-with-wizard">
                <Subheader {...props.subheader}>
                    <Subheader.Right>
                        {props.subheaderContent}
                    </Subheader.Right>
                    {stepWizard}
                </Subheader>
            </div>
            <div className="wizard-page-content" ref={ref}>
                {props.children}
            </div>
        </Page>
    );
});
