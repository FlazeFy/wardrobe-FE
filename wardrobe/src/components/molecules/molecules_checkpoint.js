export default function MoleculesCheckpoint(props) {
    return (
        <div className="mb-2">
            <h6 className="mb-1 fw-bold">Checkpoint : </h6>
            {
                props.list && props.list.length > 0 && (
                    props.list.map(dt => {
                        return  <p className="mb-0">{dt.is_finished == 1 ? <span title="Done"> ✅ </span> : <span title="In Progress"> ❌ </span>} {dt.checkpoint_name}</p>
                    })
                )
            }
        </div>
    );
}
  