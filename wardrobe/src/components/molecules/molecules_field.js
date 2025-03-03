import { getCleanTitleFromCtx } from "@/modules/helpers/converter"
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
                    <input className='form-control' defaultValue={props.defaultValue} type={props.type} onChange={props.handleChange} disabled={props.isDisabled ?? false} ></input>
                : props.type == 'textarea' ?
                    <textarea className='form-control' style={{minHeight:"200px"}} defaultValue={props.defaultValue} type={props.type} disabled={props.isDisabled ?? false} onChange={props.handleChange}></textarea>
                : props.type == 'select' ? 
                    <select className="form-select" onChange={props.handleChange} disabled={props.isDisabled ?? false} value={props.defaultValue}>
                        {
                            props.items.map((el, idx)=>{
                                return <option value={el} key={idx}>{getCleanTitleFromCtx(el)}</option>
                            })
                        }
                    </select>
                : props.type == 'toggle' ?
                    <Switch onChange={props.handleChange} checked={props.defaultValue} disabled={props.isDisabled ?? false} checkedIcon={false} uncheckedIcon={false}/>
                : props.type == 'checkbox' ?
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="me-2">{props.title}</label>
                    </div>
                : props.type == 'file' ?
                    <div className="me-2">
                        <label htmlFor="formFile" className="form-label">{props.title}</label>
                        <input className="form-control" type="file" accept={props.accept} onChange={props.handleChange}></input>
                    </div>
                : props.type == 'rating' ?
                    <ReactStars count={5} onChange={props.handleChange} size={24} half={false} color2={'#ffd700'}/>
                :
                    <></>
            }
        </div>
    )
}