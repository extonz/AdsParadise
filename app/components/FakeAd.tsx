interface FakeAdProps {
  title: string;
  description: string;
  button: string;
  onClick?: () => void;
}

export default function FakeAd({
  title,
  description,
  button,
  onClick,
}: FakeAdProps) {
  return (
    <div className="fake-ad">
      <div className="ad-label">ADVERTISEMENT</div>

      <div className="fake-ad-content">
        <h2>{title}</h2>

        <p>{description}</p>

        <button onClick={onClick}>
          {button}
        </button>
      </div>

      <div className="fake-ad-footer">
        Sponsored by absolutely nobody
      </div>
    </div>
  );
}