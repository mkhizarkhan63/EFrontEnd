import { createServices } from '~/api';
import { Display } from './Display';
import { Profile } from './Profile';
import { Projects } from './Projects';
import { Contractors } from './Contractors';
import { Locations } from './Locations';
import { Stages } from './Stages';
import { Sows } from './Sows';
import { Notifications } from './Notifications';
import { Stats } from './Stats';
import { IdCollection } from './IdCollection';
import { Companies } from './Companies';
import { Designs } from './Designs';
import { Users } from './Users';
import { ConsultantProfile } from './ConsultantProfile';
import { ContractorProfile } from './ContractorProfile';
import { Workflows } from './Workflows';
import { Badges } from './Badges';

export const stores = createServices({
    display: () => new Display(),
    profile: () => new Profile(),
    projects: () => new Projects(),
    contractors: () => new Contractors(),
    contractorProfile: () => new ContractorProfile(),
    consultantProfile: () => new ConsultantProfile(),
    locations: () => new Locations(),
    stages: () => new Stages(),
    sows: () => new Sows(),
    workflows: () => new Workflows(),
    notifications: () => new Notifications(),
    stats: () => new Stats(),
    idCollection: () => new IdCollection(),
    companies: () => new Companies(),
    designs: () => new Designs(),
    users: () => new Users(),
    badges: () => new Badges()
});
