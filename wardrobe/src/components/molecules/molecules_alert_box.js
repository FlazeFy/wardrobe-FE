//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faWarning } from "@fortawesome/free-solid-svg-icons"
import { getCleanTitleFromCtx } from '../../modules/helpers/converter'

export default function MoleculesAlertBox(props) {
    return (
        <div>
            {
                props.type == 'error' && <h4>{getCleanTitleFromCtx(props.context)}</h4>
            }
            <div className={`alert alert-${props.type}`} role='alert'>
                <h4><FontAwesomeIcon icon={props.type == 'warning' || props.type == 'danger' ? faWarning : faCircleInfo}/> {props.type == 'danger' ? 'error' : props.type == 'primary' ? 'information' : props.type}</h4>
                {props.message}
            </div>
        </div>
    )
}