import { Button } from '~/bits';

export const Rejected = () => (
    <div className="rejected">
        <span className="subscription__profile-info subscription__profile-info--rejected">Profile rejected</span>
        <h3 className="subscription__title-main">Your profile got rejected.</h3>
        <h3 className="subscription__title-sub">Your profile got rejected because of the following reasons</h3>
        <ul className="subscription__list">
            <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
            <li>Voluptatem accusantium doloremque laudantium</li>
            <li>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis</li>
            <li>Quasi architecto beatae vitae dicta sunt explicabo</li>
        </ul>
        <Button
            value="Apply Again"
            color="white"
            hasOutline={true}
        />
    </div>
);
