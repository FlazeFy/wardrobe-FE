export default function AtomsBreakLine(props) {
    const builder = Array(props.length).fill(1)

    return (
        <>
            {
                builder.map((_,idx) => {
                    return <br key={`br_${idx}`}></br>
                })
            }
        </>
    )
}
  