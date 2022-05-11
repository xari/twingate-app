export default function ImgTxt({ imageURI, text, title, leftToRight }) {
  const imgStyle = { backgroundImage: `url(${imageURI})` };
  const image = (
    <div
      className="h-full w-full bg-cover bg-center"
      style={imgStyle}
      title={title}
    ></div>
  );
  const textContent = (
    <div className="h-48 p-5">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p>{text}</p>
    </div>
  );

  return (
    <>
      {leftToRight ? (
        <div className="grid grid-cols-2 w-full">
          {image}
          {textContent}
        </div>
      ) : (
        <div className="grid grid-cols-2 w-full text-right">
          {textContent}
          {image}
        </div>
      )}
    </>
  );
}
