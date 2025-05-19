import { getCleanTitleFromCtx } from "../../modules/helpers/converter"
import ReactStars from "react-stars"
import Switch from "react-switch"

export default function MoleculesField(props){
    return (
        <div className={`field ${props.type == 'rating' ? 'text-start' :''}`}>
            {
                props.type != 'file' && props.type != 'checkbox' && <label className="me-2">{props.title}</label>
            }
            {
                props.type == 'text' || props.type == 'number' || props.type == 'date' || props.type == 'password' ?
                    <input className='form-control' value={props.defaultValue ?? ''} type={props.type} onChange={props.handleChange} disabled={props.isDisabled ?? false} id={props.id}></input>
                : props.type == 'textarea' ?
                    <textarea className='form-control' style={{minHeight:"200px"}} value={props.defaultValue ?? ''} id={props.id} type={props.type} disabled={props.isDisabled ?? false} onChange={props.handleChange}></textarea>
                : props.type == 'select' ? 
                    <select className="form-select" onChange={props.handleChange} disabled={props.isDisabled ?? false} id={props.id} value={props.defaultValue}>
                        {
                            props.items.map((el, idx)=>{
                                return <option value={el} key={idx}>{getCleanTitleFromCtx(el)}</option>
                            })
                        }
                    </select>
                : props.type == 'toggle' ?
                    <Switch onChange={props.handleChange} id={props.id} checked={props.defaultValue} disabled={props.isDisabled ?? false} checkedIcon={false} uncheckedIcon={false}/>
                : props.type == 'checkbox' ?
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={props.handleChange} id={props.id} checked={props.defaultValue} disabled={props.isDisabled}></input>
                        <label className="me-2">{props.title}</label>
                    </div>
                : props.type == 'file' ?
                    <div className="me-2">
                        <label htmlFor="formFile" className="form-label">{props.title}</label>
                        <input className="form-control" type="file" accept={props.accept} onChange={props.handleChange} id={props.id}></input>
                    </div>
                : props.type == 'rating' ?
                    <div id={props.id}>
                        <ReactStars count={5} onChange={props.handleChange} size={24} half={false} color2={'#ffd700'}/>
                    </div>
                :
                    <></>
            }
        </div>
    )
}