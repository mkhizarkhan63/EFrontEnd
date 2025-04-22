type Props = {
    projectNumber: string;
    page: string;
    pageNum: number;
};

export const Footer = (props: Props) => (
    <div className="pdf-footer">
        <div className="pdf-footer__left">
            <img src="/assets/graphics/logo_sign.png" alt="ebinaa logo" />
            <span>&copy; eBinaa {String(new Date().getFullYear())} - {props.projectNumber}</span>
        </div>
        <span className="pdf-footer__right">
            {props.page} - {String(props.pageNum).padStart(2, '0')}
        </span>
    </div>
);
