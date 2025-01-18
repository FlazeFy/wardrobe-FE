export default function MoleculesClothesStatus(props) {
    return (
        <div className='mt-2'>
            {
                props.item.is_favorite == 1 && (
                    <div className='box-icon' title="Favorited">
                        <img src={"/images/favorite.png"}/>
                    </div>
                )
            }
            {
                props.item.is_scheduled == 1 && (
                    <div className='box-icon' title="Scheduled">
                        <img src={"/images/scheduled.png"}/>
                    </div>
                )
            }
            {
                props.item.has_washed == 1 && (
                    <div className='box-icon' title="Has Washed">
                        <img src={"/images/dry.png"}/>
                    </div>
                )
            }
            {
                props.item.has_ironed == 1 && (
                    <div className='box-icon' title="Has Ironed">
                        <img src={"/images/ironed.png"}/>
                    </div>
                )
            }
        </div>
    );
}
  