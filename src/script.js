// Function to get and format the time for a specific time zone
function getTimeForTimezone(timezone) {
    const now = new Date();
    
    // Options for time formatting
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
        timeZone: timezone
    };
    
    // Options for date formatting
    const dateOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: timezone
    };

    const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    const dateString = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

    return { time: timeString, date: dateString };
}

// Function to update all clocks on the page
function updateClocks() {
    // 1. Update User's Local Time (Browser's Time Zone)
    // The browser automatically uses the local time zone when no 'timeZone' option is specified.
    const localTime = getTimeForTimezone(undefined); 
    document.getElementById('local-time-display').textContent = localTime.time;
    document.getElementById('local-date-display').textContent = localTime.date;

    // 2. Update Clocks for Specific Cities
    const cityTimeDisplays = document.querySelectorAll('.clock-card .time-display:not(#local-time-display)');

    cityTimeDisplays.forEach(displayElement => {
        // Get the time zone from the custom 'data-timezone' attribute
        const timezone = displayElement.getAttribute('data-timezone');
        
        if (timezone) {
            const cityTime = getTimeForTimezone(timezone);
            displayElement.textContent = cityTime.time;
        }
    });
}

// Initial update and set up the interval to update every second
updateClocks();
setInterval(updateClocks, 1000); 

// --- Optional: Detect Local Time Zone Name and update the heading ---
// This part is for better localization (e.g., displaying "Kuala Lumpur, Malaysia" instead of "Your Local Time")
function updateLocalClockName() {
    // Get the browser's determined time zone
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Try to get a more readable country/city name 
    // This is an approximation and works well for common time zones
    const parts = localTimezone.split('/');
    let readableName = parts[parts.length - 1].replace('_', ' ');
    
    if (readableName) {
        // Find the clock card and update its heading
        const localClockCard = document.querySelector('.local-time h2');
        if (localClockCard) {
            localClockCard.innerHTML = `${readableName} 📍`;
        }
    }
}

updateLocalClockName();