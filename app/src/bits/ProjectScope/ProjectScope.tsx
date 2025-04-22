import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { E, lang } from '~/api';
import { Close, SideModal, SortedTable, Switch } from '~/bits';
import type { SowSubitem, Project, SowItem, Sow } from '~/models';

type Props = {
    project: Project;
    sow?: Sow;
    toggleIsProjectScope: () => void;
};

type MenuProps = {
    sow: Sow;
    activeSowItem?: SowItem;
    setActiveSowItem: (item?: SowItem) => void;
};

const getColumns = () => SortedTable.createColumns<SowSubitem>(
    () => [
        {
            keyName: lang.dict.get('order'),
            displayName: lang.dict.get('section'),
            size: .8,
            isSortable: false,
            render: item => <div className="section">{item.orderNumber + 1}</div>,
        },
        {
            keyName: lang.dict.get('description'),
            displayName: lang.dict.get('description'),
            size: 9,
            isSortable: false,
            render: item => <p>{lang.currentLanguage === 'en' ? item.englishDescription : item.arabicDescription}</p>,
        },
    ]);

const Menu = observer((props: MenuProps) => {
    const elements = props.sow?.sowItems.map(item => (
        <p
            key={`project-scope-${item.id.asStr()}`}
            data-is-active={item.id.isEqual(props.activeSowItem?.id)}
            className="project-scope__tab-item"
            onClick={() => props.setActiveSowItem(item)}
        >
            <img src={item.logo?.img?.url} alt="logo" className="project-scope__tab-item-img" />
            <p className="project-scope__tab-item-name">{lang.currentLanguage === 'en' ? item.englishName : item.arabicName}</p>
        </p>
    ));

    return <>{elements}</>;
});

const Content = observer((props: { activeSowItem?: SowItem }) => {
    const data = props.activeSowItem?.forConstruction.sowSubItems;

    if (!data) {
        return null;
    }

    return (
        <div className="project-scope__content">
            <p className="project-scope__content-header">
                {lang.currentLanguage === 'en' ? props.activeSowItem?.englishName : props.activeSowItem?.arabicName}
            </p>
            <SortedTable
                data={data}
                keyValue="orderNumber"
                columns={getColumns()}
            />
        </div>
    );
});

const Title = observer((props: { title: string; type: string }) => (
    <p className="project-scope__title">
        <span className="project-scope__title-header">
            {props.title}
        </span>
        -
        <span className="project-scope__title-type">
            {props.type}
        </span>
    </p>
));

export const ProjectScope = observer((props: Props) => {
    const [activeSowItem, setActiveSowItem] = useState<SowItem | undefined>();
    const { project, toggleIsProjectScope, sow } = props;

    if (!sow) {
        return null;
    }

    useEffect(() => {
        setActiveSowItem(sow?.sowItems[0]);
    }, [sow.sowItems[0]]);

    return (
        <SideModal variant="project-scope" onBlur={toggleIsProjectScope}>
            <div className="project-scope__left">
                <div className="side-modal__header">
                    <Close onClick={toggleIsProjectScope} />
                    <p className="side-modal__header-title">
                        {lang.dict.get('projectScope')}
                    </p>
                </div>
                <Switch
                    state={() => project.constructionType !== E.ConstructionType.none}
                    alt={() => (
                        <Title
                            title={lang.dict.get('landType')}
                            type={lang.dict.enum('landType', project.landType)}
                        />
                    )}
                >
                    <Title
                        title={lang.dict.get('projectPropertyConstructionRequirement')}
                        type={lang.dict.enum('constructionType', project.constructionType)}
                    />
                </Switch>
                <div className="project-scope__tab">
                    <div className="project-scope__tab-items">
                        <Menu
                            sow={sow}
                            activeSowItem={activeSowItem}
                            setActiveSowItem={setActiveSowItem}
                        />
                    </div>
                </div>
            </div>
            <div className="project-scope__right">
                <Content activeSowItem={activeSowItem} />
            </div>
        </SideModal>
    );
});
