import { Button } from '~/bits';

export const Review = () => (
    <div className="review">
        <span className="subscription__profile-info subscription__profile-info--review">Profile under review</span>
        <h3 className="subscription__title-main">Explore Platform to check the recently uploaded projects</h3>
        <h3 className="subscription__title-sub">How eBinaa Works</h3>
        <ul className="subscription__list">
            <li>Sed ut perspiciatis unde omnis iste natus error sit</li>
            <li>Voluptatem accusantium doloremque laudantium</li>
            <li>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis</li>
            <li>Quasi architecto beatae vitae dicta sunt explicabo</li>
        </ul>
        <Button
            value="How it Works?"
            color="white"
            hasOutline={true}
        />
    </div>
);
