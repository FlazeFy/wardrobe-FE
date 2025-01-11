import { getCleanTitleFromCtx } from "@/modules/helpers/converter"
import Switch from "react-switch"

export default function MoleculesField(props){
    return (
        <div className="field">
            {
                props.type != 'file' && <label className="me-2">{props.title}</label>
            }
            {
                props.type == 'text' || props.type == 'number' || props.type == 'date' ?
                    <input className='form-control' defaultValue={props.defaultValue} type={props.type} onChange={props.handleChange}></input>
                : props.type == 'textarea' ?
                    <textarea className='form-control' style={{minHeight:"200px"}} defaultValue={props.defaultValue} type={props.type} onChange={props.handleChange}></textarea>
                : props.type == 'select' ? 
                    <select className="form-select" onChange={props.handleChange} value={props.defaultValue}>
                        {
                            props.items.map((el, idx)=>{
                                return <option value={el} key={idx}>{getCleanTitleFromCtx(el)}</option>
                            })
                        }
                    </select>
                : props.type == 'toggle' ?
                    <Switch onChange={props.handleChange} checked={props.defaultValue} checkedIcon={false} uncheckedIcon={false}/>
                : props.type == 'file' ?
                    <div className="me-2">
                        <label htmlFor="formFile" className="form-label">{props.title}</label>
                        <input className="form-control" type="file" accept={props.accept} onChange={props.handleChange}></input>
                    </div>
                :
                    <></>
            }
        </div>
    )
}