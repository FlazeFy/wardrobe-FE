export default function MoleculesFeaturesBox(props) {
    return (
        <div className="feature-box me-3 mb-4">
            <div className="d-flex justify-content-start align-items-center">
                <div className="circle-icon me-3">{props.icon}</div>
                <div>
                    <h4>{props.title}</h4>
                    <p className="text-secondary mb-0">{props.description}</p>
                </div>
            </div>
        </div>
    )
}
  