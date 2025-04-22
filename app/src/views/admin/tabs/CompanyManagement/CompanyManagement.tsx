import { observer } from "mobx-react";
import { CompanyManagementVm } from "./CompanyManagement.vm";
import { hook } from "~/utils";
import { E, lang } from '~/api';
import { Button, Icons, If, Input, MenuButton, SortedTable } from '~/bits';
import { BadgesList } from "~/api/Rest/queries/badges";

type props = {
    vm: CompanyManagementVm
}


type accordionItem = {
    item: MenuButton<E.CompanyManagementSizing>
}
const Items = observer(({ item }: accordionItem) => {
    return (
        <>
            {item.value === E.CompanyManagementSizing.projectSizes && (
                <>
                    <div className="tables__gridContainer-project">
                        <div className="row">
                            <p>{lang.dict.get('projectSize')} </p>
                            <p>{lang.dict.get('builtUpAreas')}</p>
                            <p>{lang.dict.get('timeEstimation')}</p>
                        </div>
                    </div>
                    <div className="tables__gridContainer-project">
                        <div className="row">
                            <div className="title">{lang.dict.get("micro")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeTimeEstPlaceholder')} />
                                <span>{lang.dict.get('months')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-project">
                        <div className="row">
                            <div className="title">{lang.dict.get("small")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeTimeEstPlaceholder')} />
                                <span>{lang.dict.get('months')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-project">
                        <div className="row">
                            <div className="title">{lang.dict.get("medium")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeTimeEstPlaceholder')} />
                                <span>{lang.dict.get('months')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-project">
                        <div className="row">
                            <div className="title">{lang.dict.get("large")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeTimeEstPlaceholder')} />
                                <span>{lang.dict.get('months')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="save-button">
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                        />
                    </div>
                </>
            )}
            {item.value === E.CompanyManagementSizing.forConsultant && (
                <>
                    <div className="tables__gridContainer-consultant">
                        <div className="row">
                            <p>{lang.dict.get('companySize')} </p>
                            <p>{lang.dict.get('engineers')}</p>
                            <p>{lang.dict.get('labors')}</p>
                            <p>{lang.dict.get('machines')}</p>
                            <p>{lang.dict.get('experience')}</p>
                            <p>{lang.dict.get('projectLimit')}</p>
                            <p>{lang.dict.get('projectBuiltUpArea')}</p>
                        </div>
                    </div>
                    <div className="tables__gridContainer-consultant">
                        <div className="row">
                            <div className="title">{lang.dict.get("micro")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-consultant">
                        <div className="row">
                            <div className="title">{lang.dict.get("small")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-consultant">
                        <div className="row">
                            <div className="title">{lang.dict.get("medium")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-consultant">
                        <div className="row">
                            <div className="title">{lang.dict.get("large")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeAreaPlaceholder')} />
                                <span>{lang.dict.get('m2')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="save-button">
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                        />
                    </div>
                </>
            )}
            {item.value === E.CompanyManagementSizing.forContractor && (
                <>
                    <div className="tables__gridContainer-contractor">
                        <div className="row">
                            <p>{lang.dict.get('companySize')} </p>
                            <p>{lang.dict.get('engineers')}</p>
                            <p>{lang.dict.get('experience')}</p>
                            <p>{lang.dict.get('projectLimit')}</p>

                        </div>
                    </div>
                    <div className="tables__gridContainer-contractor">
                        <div className="row">
                            <div className="title">{lang.dict.get("micro")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>

                        </div>
                    </div>
                    <div className="tables__gridContainer-contractor">
                        <div className="row">
                            <div className="title">{lang.dict.get("small")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>

                        </div>
                    </div>
                    <div className="tables__gridContainer-contractor">
                        <div className="row">
                            <div className="title">{lang.dict.get("medium")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>

                        </div>
                    </div>
                    <div className="tables__gridContainer-contractor">
                        <div className="row">
                            <div className="title">{lang.dict.get("large")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>

                        </div>
                    </div>
                    <div className="save-button">
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                        />
                    </div>
                </>
            )}
            {item.value === E.CompanyManagementSizing.forArchitect && (
                <>
                    <div className="tables__gridContainer-architect">
                        <div className="row">
                            <p>{lang.dict.get('companySize')} </p>
                            <p>{lang.dict.get('engineers')}</p>
                            <p>{lang.dict.get('experience')}</p>
                            <p>{lang.dict.get('projectLimit')}</p>

                        </div>
                    </div>
                    <div className="tables__gridContainer-architect">
                        <div className="row">
                            <div className="title">{lang.dict.get("micro")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>

                        </div>
                    </div>
                    <div className="tables__gridContainer-architect">
                        <div className="row">
                            <div className="title">{lang.dict.get("small")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-architect">
                        <div className="row">
                            <div className="title">{lang.dict.get("medium")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                        </div>
                    </div>
                    <div className="tables__gridContainer-architect">
                        <div className="row">
                            <div className="title">{lang.dict.get("large")}</div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                                <span>{lang.dict.get('years')}</span>
                            </div>
                            <div className="input">
                                <Input.Text placeHolder={lang.dict.get('projectSizeEg12')} />
                            </div>
                        </div>
                    </div>
                    <div className="save-button">
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                        />
                    </div>
                </>
            )}
        </>
    );
});

const SizingComponent = observer(({ vm }: props) => {
    const sizingNavs = vm.menuItems.map((x, index) => (
        <div
            className="sizing-menu"
            key={index}
        >
            <div className="sizing-menu__header">
                <h2 className="sizing-menu__header-text">
                    {x.name}
                </h2>
                <div className="sizing-menu__header-right" data-toggle={x.isDisabled}>
                    <Button
                        color="white"
                        isCircle={true}
                        centerImg="dropdown"
                        onClick={() => { vm.accordionToggle(x.value) }}

                    />
                </div>
            </div>
            <div className="sizing-menu__toggle-content" data-toggle={x.isDisabled}>

                <Items item={x} />

            </div>
        </div>
    ));

    return <>{sizingNavs}</>;
});

const BadgeListingComponent = observer(({ vm }: props) => {
    return (
        <div
            className="badge-list"
        >
            <div className="badge-list__header">
                <div className="badge-list__header-text">
                    <h2 >
                        {lang.dict.get("badgeListing")}
                    </h2>
                </div>
                <div className="badge-list__header-right">
                    <div className="search-field">
                        <Input.Text
                            placeHolder={lang.dict.get('badgeName')}
                        />
                        <Icons icon="search" />
                    </div>
                    <div className="createBadge">
                        <Button
                            color="blue"
                            leftImg="add"
                            value={lang.dict.get('createBadge')}
                            onClick={vm.createBadge}
                        />
                    </div>
                </div>
            </div>
            <div className="badge-list__body">
                <SortedTable
                    data={vm.badgesList.data as BadgesList[]}
                    keyValue="id"
                    columns={getColumns(vm)}
                    customHeader={vm.badgesListSorter}
                    lazyLoad={vm.badgesList}
                />
            </div>
        </div>
    )

});

const getColumns = (vm: CompanyManagementVm) => SortedTable.createColumns<BadgesList>(() => [
    {
        keyName: 'iconIsAsc',
        displayName: lang.dict.get('badgeName'),
        size: 1.78,
        render: item => (
            <div className="badges">
                <img src={item.iconUrl} alt=" " className="badges__img" />
                <div className="badges__desc">
                    <p className="badges__name">
                        {item.badgeName}
                    </p>
                    <p className="badges__type">
                        {/* {utilsString.capitalize(item.type)} */}
                    </p>
                </div>
            </div>
        ),
    },
    {
        keyName: 'dateIssuedAscending',
        displayName: lang.dict.get('dateIssued'),
        size: 1,
        render: item => (
            <div className="dateIssued">
                <p className="dateIssued__name">
                    {item.dateissued}
                </p>
            </div>
        ),
    },
    {
        keyName: 'typeAscending',
        displayName: lang.dict.get('type'),
        size: 1,
        render: item => (
            <div className="type">
                <p className="type__name">
                    {item.type}
                </p>
            </div>
        ),
    },
    {
        keyName: 'serviceAscending',
        displayName: lang.dict.get('service'),
        size: 1,
        render: item => (
            <div className="service">
                <p className="service__name">
                    {item.service}
                </p>
            </div>
        ),
    },
    {
        keyName: 'appliedAscending',
        displayName: lang.dict.get('applied'),
        size: 1,
        render: item => (
            <div className="applied">
                <p className="applied__name">
                    {item.applied}
                </p>
            </div>
        ),
    },
    {
        keyName: 'awardedAscending',
        displayName: lang.dict.get('awarded'),
        size: 1,
        render: item => (
            <div className="awarded">
                <p className="awarded__name">
                    {item.awarded}
                </p>
            </div>
        ),
    },
    {
        keyName: 'statusAscending',
        displayName: lang.dict.get('status'),
        size: 1,
        render: item => (
            <div className="status" data-status={item.status.toLowerCase()}>
                <p className="status__name">
                    {item.status}
                </p>
            </div>
        ),
    },

    {
        keyName: 'viewDetails',
        displayName: lang.dict.get('action'),
        align: 'right' as const,
        size: .6,
        render: item => (
            <>
                <Button
                    color="transparent"
                    value={lang.dict.get('viewDetail')}
                />
                <Button
                    color="transparent"
                    value={lang.dict.get('delete')}
                />
            </>
        ),
    },
]);


export const CompanyManagement = observer(() => {
    const vm = hook.useVm(() => new CompanyManagementVm());

    return (
        <div className="company-management">
            <div className="top-header">
                <h1 className="top-header__text">
                    {lang.dict.get('companyManagement')}
                </h1>
                <div className="top-header__right">

                </div>
            </div>

            <div className="company-management__nav">
                <div className="company-management__nav-item" data-is-active={vm.isSizing}>
                    <Button
                        color="blue"
                        leftImg="design-menu-icon"
                        value={lang.dict.get('sizingTab')}
                        onClick={vm.toggleProject(E.CompanyManagementFilter.sizing)}
                    />
                </div>
                <div className="company-management__nav-item" data-is-active={!vm.isSizing}>
                    <Button
                        color="blue"
                        leftImg="badge"
                        value={lang.dict.get('badgesTab')}
                        onClick={vm.toggleProject(E.CompanyManagementFilter.badges)}
                    />
                </div>
            </div>
            {/* Showing Sizing Component */}
            {vm.isSizingType ? null : <SizingComponent vm={vm} />}

            {/* Showing Badge Component */}
            {!vm.isSizingType ? null : <BadgeListingComponent vm={vm} />}


        </div>

    );


})
