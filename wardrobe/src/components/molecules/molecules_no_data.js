export default function MoleculesNoData(props) {
    return (
        <div className='p-3 mx-auto text-center'>
            <img src={"/images/empty.png"} style={{width:"200px"}}/>
            <p className='text-secondary' style={{fontSize:"var(--textXMD)"}}>- { props.title } -</p>
        </div>
    )
}