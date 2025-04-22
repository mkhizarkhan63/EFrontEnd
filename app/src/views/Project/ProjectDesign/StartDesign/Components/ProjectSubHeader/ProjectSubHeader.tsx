import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Menu, Subheader } from '~/bits';
import type { StartDesignVm } from '../../StartDesign.vm';

type PropertyProps = {
    top?: string;
    bottom?: string;
    isDistinguished?: boolean;
};

const Property = (props: PropertyProps) => (
    <div
        className="property"
        data-distinguish={props.isDistinguished}
    >
        <div className="property__name">
            {props.top}
        </div>
        <div className="property__value">
            {props.bottom}
        </div>
    </div>
);

type Props = {
    vm: StartDesignVm;
};

export const ProjectSubHeader = observer(({ vm }: Props) => {
    const DesignMenu = () => (
        <Menu
            getItems={() => vm.menuItems}
            isActive={vm.isMenuItemActive}
            isAnimated={true}
        />
    );

    return (
        <Subheader
            hasReturnButton={true}
            returnButton={vm.goBack}
            menu={() => <DesignMenu />}
        >
            <Subheader.Right>
                <div className="project-design__properties">
                    <Property
                        top={vm.project.wilayat?.displayName}
                        bottom={vm.project.governorate?.displayName}
                    />
                    <Property
                        top={lang.dict.format('squareMetersFormat', [vm.project.landArea])}
                        bottom={lang.dict.enum('landType', vm.project.landType)}
                        isDistinguished={true}
                    />
                    <span className="need-help">
                        {lang.dict.get('needHelp')}
                    </span>
                    <Button
                        color="white"
                        value={lang.dict.get('watchVideo')}
                        leftImg="play"
                    />
                </div>
            </Subheader.Right>
        </Subheader>
    );
});
