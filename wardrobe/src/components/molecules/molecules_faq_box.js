import { convertDatetimeBasedLocal } from "../../modules/helpers/converter"

export default function MoleculesFAQBox(props) {
    return (
        <div className="faq-box mb-4">
            <div style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target={`#collapseFAQ-${props.id}`}>
                <h6 className="mb-1">{props.question}</h6>
                <p className="text-date mb-0">Ask on {convertDatetimeBasedLocal(props.created_at)}</p>
            </div>
            <div className="collapse show text-secondary" id={`collapseFAQ-${props.id}`}>
                <hr></hr>
                <p className="mb-0">{props.answer}</p>
            </div>
        </div>
    )
}
  