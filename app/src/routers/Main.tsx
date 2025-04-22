import { observer } from 'mobx-react';
import { lazy, Suspense, useEffect } from 'react';
import { auth, E, type Route } from '~/api';
import { CriticalError } from '~/bits';
import { stores } from '~/stores';
import {
    Biding,
    BuildTab,
    Buy,
    ClientDesign,
    ClientProfileSettings,
    CompanyProfile,
    CompanyProfileSettings,
    ConsultantProject,
    Contract,
    Design,
    LoadingPage,
    MyProjects,
    Notifications,
    PmModule,
    ProfileRegistration,
    Project,
    ProjectInvitations,
} from '~/views';
import { CompanyInvites } from '~/views/CompanyInvites';

const LazyAdminView = lazy(() => import('./Admin/Admin')
    .then(c => ({ default: c.Admin })));

const isContextPath = (path: Route, type: E.RoleInCompany) => path.match && path.params.type === type;

const runContextRoute = (context: E.RoleInCompany) => {
    const d = stores.display;
    const r = d.router;

    if (isContextPath(r.$.context.$.project.$.contract, context)) {
        return <Contract />;
    }

    if (isContextPath(r.$.context.$.project.$.management, context)) {
        //contractor pm path
        // console.log(r.$.context.$.project.$.management)
        // console.log(context)
        // console.log(r.$.context.$.project.params.id)

        return <PmModule projectId={r.$.context.$.project.params.id} />;
    }

    if (isContextPath(r.$.context.$.project, context)) {
        return context === E.RoleInCompany.contractor
            ? <Biding isEditable={true} />
            : <ConsultantProject />;
    }

    if (r.$.settings.match) {
        return <CompanyProfileSettings />;
    }

    if (isContextPath(r.$.company.$.edit, context)) {
        return <ProfileRegistration isNew={false} />;
    }

    if (r.$.newProjects.match) {
        return (
            <MyProjects.Company
                profileType={context}
                isNewProjects={true}
            />
        );
    }

    return (
        <MyProjects.Company
            invalidRoute={!r.$.home.match}
            profileType={context}
        />
    );
};

const MainRoute = observer(() => {
    const d = stores.display;
    const r = d.router;

    useEffect(() => {
        if (r.isReloading) {
            r.reload();
        }
    }, [r.isReloading]);

    if (auth.isLoading || r.isReloading || stores.profile.isLoading) {
        return <LoadingPage />;
    }

    if (r.$.invitations.match) {
        return <ProjectInvitations />;
    }

    if (r.$.clientDesign.match) {
        return <ClientDesign />;
    }

    if (r.$.buy.match) {
        return <Buy />;
    }

    if (r.$.build.match) {
        return <BuildTab />;
    }

    if (r.$.invites.match) {
        return <CompanyInvites />;
    }

    if (r.$.project.$.create.match) {
        return <Project route={E.ProjectRoute.new} />;
    }

    if (r.$.project.$.sub.$.details.match) {
        return <Project route={E.ProjectRoute.exists} />;
    }

    if (r.$.project.$.sub.$.contract.match) {
        return <Contract />;
    }

    if (r.$.project.$.sub.$.management.match) {
        return <PmModule projectId={r.$.project.$.sub.params.id} />;
    }

    if (d.isAdmin && r.$.admin.match) {
        return (
            <Suspense fallback={<LoadingPage />}>
                <LazyAdminView />
            </Suspense>
        );
    }

    if (r.$.company.$.register.match) {
        return <ProfileRegistration isNew={true} />;
    }

    if (r.$.context.$.details.match) {
        return <CompanyProfile type={r.$.context.params.type} />;
    }

    if (r.$.notifications.match) {
        return <Notifications />;
    }

    //context
    if ([E.RoleInCompany.contractor, E.RoleInCompany.consultant].includes(d.profile.role)) {
        return runContextRoute(d.profile.role);
    }

    // client
    if (r.$.settings.match) {
        return <ClientProfileSettings />;
    }

    if (r.$.design.match) {
        return <Design />;
    }

    if (r.$.project.$.list.match) {
        return <MyProjects.Client />;
    }

    return <MyProjects.Client invalidRoute={!r.$.home.match} />;
});

export const Main = observer(() => (
    <>
        <MainRoute />
        <CriticalError isCve={true} />
    </>
));
