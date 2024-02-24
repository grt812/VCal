export default function Navigation() {
    // Get current date
    const currentDate = new Date();
    const [date, setDate] = useState(currentDate);

    // Function to get the number of days in a month
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return new Date(year, month, 0).getDate();
    };

    // Function to get the first day of the month
    const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
    };

    // Function to handle previous month button click
    const goToPreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
    };

    // Function to handle next month button click
    const goToNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
    };

    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = getFirstDayOfMonth(date);

    // Create an array of days in the month
    const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Create an array to represent blank cells before the first day of the month
    const blankCells = Array.from({ length: firstDayOfMonth }, (_, index) => index);

    return(
        <div id="navigation" className="flex header">
            <button onClick={goToPreviousMonth}>&lt;</button>
            <span class="grow text-center">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={goToNextMonth}>&gt;</button>
        </div>
    )

}