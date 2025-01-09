import { faPenToSquare, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CalendarSectionSchedule(props) {
    const { month_year } = props
    const [month, year] = month_year.split('-').map(Number)

    const getDatesForMonth = (month, year) => {
        const dates = [];
        const daysInMonth = new Date(year, month, 0).getDate()
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day)
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
            dates.push({ formattedDate, dayOfWeek: date.getDay() })
        }
        return dates;
    };

    const dates = getDatesForMonth(month, year);

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th style={{ width: '140px' }}>Date</th>
                    <th>Used History</th>
                    <th>Weekly Schedule</th>
                    <th>Wash Schedule</th>
                    <th>Buyed History</th>
                    <th>Add to Wardrobe</th>
                    <th>Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    dates.map((date, index) => (
                        <tr key={index}>
                            <td className="text-center">{date.formattedDate}</td>
                            {
                                Array.from({ length: 6 }).map((_, dayIndex) => (
                                    <td key={dayIndex}>
                                        { date.dayOfWeek === dayIndex ? '' : '' }
                                        {
                                            dayIndex != 5 ?
                                            <>
                                                <h6 className="mb-0">At 04:00-05:00</h6>
                                                <div className="row mt-2 mb-3">
                                                    {
                                                        Array.from({ length: 6 }).map((_, dayIndex) => (
                                                            <div className="col-lg-6">
                                                                <div className='box-clothes p-2' onClick={(e)=> handleBoxClick(props.items.id)}>
                                                                    <img src={"/images/footwear.png"} className="img-clothes"/>
                                                                    <div className='body-clothes'>
                                                                        <p className='mb-0' style={{fontSize:"var(--textMD)"}}>Shoes A</p>
                                                                        <p className='text-secondary m-0' style={{textTransform:"capitalize", fontSize:"var(--textSM)"}}>Upper Body | Head</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                            : 
                                            <>
                                                <button className="btn btn-warning w-100 mb-2"><FontAwesomeIcon icon={faPenToSquare}/></button>
                                                <button className="btn btn-success w-100 mb-2"><FontAwesomeIcon icon={faPlus}/></button>
                                                <button className="btn btn-primary w-100"><FontAwesomeIcon icon={faPrint}/></button>
                                            </>
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
