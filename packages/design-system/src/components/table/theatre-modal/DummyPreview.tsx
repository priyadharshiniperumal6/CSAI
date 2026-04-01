
import previewSvg from '../../../assets/preview.svg';

export const DummyPreview = () => {
    return (
        <img className="uni-demo-image" src={previewSvg} alt="Uniphore" style={{ width: '100%', height: 'auto' }} />
    );
};

export default DummyPreview;
