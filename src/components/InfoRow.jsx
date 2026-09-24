import { Link } from 'react-router';

export default function InfoRow({
  label,
  value,
  size = 'lg',
  valueAsLink = false,
  linkTarget = '_blank',
  linkText = null,
  valueAsBlock = false,
  isLoading = false,
}) {
  return (
    <div className={`info-row ${size}`}>
      <span className="label">{label}</span>
      <span className={`value ${valueAsBlock ? 'd-block' : ''}`}>
        <span className="pe-2">:</span>
        {valueAsLink ? (
          <Link to={value} target={linkTarget}>
            {isLoading ? '...' : linkText || value || ''}
          </Link>
        ) : isLoading ? (
          '...'
        ) : value !== '' ? (
          value
        ) : (
          ''
        )}
      </span>
    </div>
  );
}
