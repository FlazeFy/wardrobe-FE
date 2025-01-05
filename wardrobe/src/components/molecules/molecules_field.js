import { getCleanTitleFromCtx } from "@/modules/helpers/converter"
import Switch from "react-switch"

export default function MoleculesField(props){
    return (
        <div className="field">
            <label className="me-2">{props.title}</label>
            {
                props.type == 'text' || props.type == 'number' ?
                    <input className='form-control' defaultValue={props.defaultValue} type={props.type} onChange={props.handleChange}></input>
                : props.type == 'textarea' ?
                    <textarea className='form-control' style={{minHeight:"200px"}} defaultValue={props.defaultValue} type={props.type} onChange={props.handleChange}></textarea>
                : props.type == 'select' ? 
                    <select className="form-select" onChange={props.handleChange}>
                        {
                            props.items.map((el)=>{
                                return <option value={el}>{getCleanTitleFromCtx(el)}</option>
                            })
                        }
                    </select>
                : props.type == 'toggle' ?
                    <Switch onChange={props.handleChange} checked={props.defaultValue} checkedIcon={false} uncheckedIcon={false}/>
                :
                    <></>
            }
        </div>
    )
}