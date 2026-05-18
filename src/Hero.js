import PropTypes from 'prop-types';

export default function Hero({ imageURI }) {
  return (
    <div>
      <img src={imageURI} className="object-cover h-48 w-full" />
    </div>
  );
}

Hero.propTypes = {
  imageURI: PropTypes.string,
};
