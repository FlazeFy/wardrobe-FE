export default function MoleculesUnfinishedWashBox(props) {
    const buildChecklist = (is_finished) => {
        return is_finished == 1 ? <span title="Done"> ✅ </span> : <span title="In Progress"> ❌ </span>
    }

    return (
        <div className="unfinished-wash-box mt-2 me-2">
            <div className="d-flex justify-content-between">
                <h4>{props.item.clothes_name}</h4>
                <span className="btn-type">{props.item.clothes_type}</span>
            </div>
            <h6>{props.item.wash_type} | Wash at {props.item.wash_at}</h6>
            {
                props.item.wash_checkpoint && props.item.wash_checkpoint.length == 1 ?
                    <>{props.item.wash_checkpoint[0].checkpoint_name}{buildChecklist(props.item.wash_checkpoint[0].is_finished)}</>
                :
                    props.item.wash_checkpoint.map((dt,idx,arr)=> {
                        if (idx === arr.length - 1) {
                            return <>, and {dt.checkpoint_name}{buildChecklist(dt.is_finished)}</>
                        } else if (idx === arr.length - 2) {
                            return <>{dt.checkpoint_name}{buildChecklist(dt.is_finished)}</>
                        } else {
                            return <>{dt.checkpoint_name}{buildChecklist(dt.is_finished)}, </>
                        }
                    })
            }
        </div>
    )
}
  