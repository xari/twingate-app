export default function Hero({ imageURI }) {
  return (
    <div>
      <img src={imageURI} className="object-cover h-48 w-full" />
    </div>
  );
}
