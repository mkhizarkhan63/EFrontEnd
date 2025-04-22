import { observer } from 'mobx-react';
import { stores } from '~/stores';
import { PageWithThinSidebar } from '~/partials';
import { Icons, If } from '~/bits';
import {
    Sow,
    SowItem,
    Project,
    Stage,
    ProjectCreator,
    Company,
    User,
    ProjectDesign
} from '~/views/admin/pages';
import {
    Dashboard,
    UserManagement,
    Companies,
    Invoices,
    SowManagement,
    Contract,
    StageManagement,
    Content,
    Reviews,
    Help,
    ProjectManagement,
    BuyProjects,
    ListedProjects
} from '~/views/admin/tabs';
import { useEffect } from 'react';
import { PmModule } from '~/views';
import { CompanyManagement } from '~/views/admin/tabs/CompanyManagement';
import { CreateBadge } from '~/views/admin/tabs/CompanyManagement/CreateBadge/CreateBadge';

type Props = {
    onClick: () => void;
    isActive: () => void;
    name: string;
};

const Tab = observer((props: Props) => (
    <div
        className="thin-sidebar__item"
        data-is-active={props.isActive()}
        onClick={props.onClick}
    >
        {props.name}
        <Icons icon="next-sign" />
    </div>
));

const Sidebar = observer(() => {
    const r = stores.display.router.$.admin;
    const { isSuperAdmin } = stores.display;

    return (
        <div className="thin-sidebar">
            <div className="thin-sidebar__content">
                <div className="thin-sidebar__step thin-sidebar__step--dashboard">
                    <Tab
                        onClick={() => r.$.dashboard.go({})}
                        isActive={() => r.$.dashboard.match}
                        name="Dashboard"
                    />
                </div>
                <div className="thin-sidebar__step thin-sidebar__step--projects">
                    <Tab
                        onClick={() => r.$.projects.go({})}
                        isActive={() => r.$.projects.match}
                        name="Projects"
                    />

                    <Tab
                        onClick={() => r.$.listedprojects.go({})}
                        isActive={() => r.$.listedprojects.match}
                        name="Listed Projects"
                    />
                </div>
                <div className="thin-sidebar__step thin-sidebar__step--users">
                    <Tab
                        onClick={() => r.$.users.go({})}
                        isActive={() => r.$.users.match}
                        name="Users"
                    />
                    <Tab
                        onClick={() => r.$.companies.go({})}
                        isActive={() => r.$.companies.match}
                        name="Companies"
                    />
                    <Tab
                        onClick={() => r.$.invoices.go({})}
                        isActive={() => r.$.invoices.match}
                        name="Invoices"
                    />
                </div>
                <If condition={isSuperAdmin}>
                    <div className="thin-sidebar__step thin-sidebar__step--management">
                        <div className="thin-sidebar__step-title">
                            Super Admin Access
                            <Icons icon="lock" />
                        </div>
                        <Tab
                            onClick={() => r.$.sow.go({})}
                            isActive={() => r.$.sow.match}
                            name="SOW Management"
                        />
                        <Tab
                            onClick={() => r.$.contract.go({})}
                            isActive={() => r.$.contract.match}
                            name="Contract Management"
                        />
                        <Tab
                            onClick={() => r.$.stage.go({})}
                            isActive={() => r.$.stage.match}
                            name="Stage Management"
                        />
                        <Tab
                            onClick={() => r.$.content.go({})}
                            isActive={() => r.$.content.match}
                            name="Content Management"
                        />
                        <Tab
                            onClick={() => r.$.company.go({})}
                            isActive={() => r.$.company.match}
                            name="Company Management"
                        />
                    </div>
                </If>
                <div className="thin-sidebar__step thin-sidebar__step--last">
                    <Tab
                        onClick={() => r.$.reviews.go({})}
                        isActive={() => r.$.reviews.match}
                        name="User Reviews"
                    />
                    <Tab
                        onClick={() => r.$.help.go({})}
                        isActive={() => r.$.help.match}
                        name="Help & FAQ"
                    />
                </div>
            </div>
        </div>
    );
});

const AdminSideContent = observer(() => {
    const r = stores.display.router.$.admin;
    const { isSuperAdmin } = stores.display;

    if (isSuperAdmin) {
        if (r.$.stage.match) {
            return <StageManagement />;
        }

        if (r.$.sow.match) {
            return <SowManagement />;
        }

        if (r.$.content.match) {
            return <Content />;
        }

        if (r.$.contract.match) {
            return <Contract />;
        }

        if (r.$.company.match) {
            return <CompanyManagement />;
        }

    }

    if (r.$.projects.match) {
        return <ProjectManagement />;
    }

    if (r.$.users.match) {
        return <UserManagement />;
    }

    if (r.$.companies.match) {
        return <Companies />;
    }

    if (r.$.invoices.match) {
        return <Invoices />;
    }

    if (r.$.reviews.match) {
        return <Reviews />;
    }

    if (r.$.help.match) {
        return <Help />;
    }
    if (r.$.listedprojects.match) {
        return <ListedProjects />
    }
    return <Dashboard />;
});

export const Admin = observer(() => {
    const r = stores.display.router.$.admin;

    useEffect(() => {
        stores.display.setConstructionType(true);

        return () => stores.display.setConstructionType(true);
    }, []);

    if (r.$.sow.$.create.match) {
        return <Sow key="sow-creating" isCreating={true} />;
    }

    if (r.$.sow.$.details.match) {
        return <Sow key="sow-details" />;
    }

    if (r.$.sow.$.createItem.match) {
        return <SowItem key="sow-item-creating" isCreating={true} />;
    }

    if (r.$.sow.$.item.match) {
        return <SowItem key="sow-item" />;
    }

    if (r.$.projects.$.create.match) {
        return <ProjectCreator />;
    }

    if (r.$.projects.$.sub.$.design.match) {
        return <ProjectDesign />;
    }

    if (r.$.projects.$.sub.$.management.match) {
        return <PmModule projectId={r.$.projects.$.sub.params.id} />;
    }

    if (r.$.projects.$.sub.match) {
        return <Project />;
    }

    if (r.$.stage.$.create.match) {
        return <Stage key="stage-creating" isCreating={true} />;
    }

    if (r.$.stage.$.details.match) {
        return <Stage key="stage" />;
    }

    if (r.$.users.$.sub.match) {
        return <User />;
    }

    if (r.$.companies.$.sub.match) {
        return <Company key={r.$.companies.$.sub.params.type} type={r.$.companies.$.sub.params.type} />;
    }
    if (r.$.listedprojects.$.buyprojects.match) {
        return <BuyProjects />;
    }
    if (r.$.company.$.createbadge.match) {
        return <CreateBadge />;
    }
    return (
        <div className="admin-view">
            <PageWithThinSidebar
                sidebar={Sidebar}
            >
                <div className="admin-content">
                    <AdminSideContent />
                </div>
            </PageWithThinSidebar>
        </div>
    );
});
