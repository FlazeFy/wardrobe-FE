import Swal from "sweetalert2";

export default function CalendarSectionMonthYear(props) {
    const handleInputChange = (e) => {
        const [year, month] = e.target.value.split('-')
        const formattedValue = `${month}-${year}`
        props.onChange(formattedValue)
        Swal.fire({
            icon: "success",
            title: 'Filtered',
            text: `Showing calendar for ${formattedValue}`,
        })
    };

    return (
        <div className="field">
            <label>Month & Year</label>
            <input className="form-control" type="month" defaultValue={`${props.defaultValue.split('-')[1]}-${props.defaultValue.split('-')[0]}`}
                onBlur={handleInputChange}/>
        </div>
    );
}
