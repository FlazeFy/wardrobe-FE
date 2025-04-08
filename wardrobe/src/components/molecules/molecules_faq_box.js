import { convertDatetimeBasedLocal } from "../../modules/helpers/converter";

export default function MoleculesFAQBox(props) {
    return (
        <div className="faq-box me-3 mb-4">
            <div className="d-flex justify-content-between" style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target={`#collapseFAQ-${props.id}`}>
                <h4 className="mb-0">{props.question}</h4>
                <p className="text-date">Ask on {convertDatetimeBasedLocal(props.created_at)}</p>
            </div>
            <div className="collapse show text-secondary" id={`collapseFAQ-${props.id}`}>
                <hr></hr>
                {props.answer}
            </div>
        </div>
    );
}
  