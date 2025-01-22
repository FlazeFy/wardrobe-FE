import { getCleanTitleFromCtx } from "../../modules/helpers/converter"

export default function MoleculesScheduleMiniBox(props){
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/detail/${id}`
    }
    
    return (
        <div className='box-schedule-mini' onClick={(e) => handleBoxClick(props.item.id)}>
            <img src={ props.item.clothes_image ?? "/images/hat.png" }/>
            <div>
                <h4 className='mb-0'>{props.item.clothes_name}</h4>
                <p className="mb-0">{getCleanTitleFromCtx(props.item.clothes_type)}</p>
            </div>
        </div>
    )
}