import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SoliciteCard.css'; // Importe o arquivo CSS

const SoliciteCard = ({ cardTitle, subTitle, cidadeTitle, status, data, onClick, statusColor }) => {
  return (
    <div className="container card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{cardTitle}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>
          </div>
        </div>
        <h4 className="card-text">{cidadeTitle}</h4>
        <h4 className="card-text" style={{ color: statusColor }}>{status}</h4>
        <h4 className="card-text">{data}</h4>
      </div>
    </div>
  );
};

SoliciteCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  cidadeTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  statusColor: PropTypes.string,
};

export default SoliciteCard;
