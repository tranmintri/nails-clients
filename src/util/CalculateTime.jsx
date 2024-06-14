export const CalculateTime = (inputDateStr) => {
  // Assuming the input date string is in UTC format
  const inputDate = new Date(inputDateStr);

  // Get current date
  const currentDate = new Date();

  // Set up date formats
  const timeFormat = { hour: "2-digit", minute: "2-digit" };
  const dateFormat = { year: "numeric", month: "2-digit", day: "2-digit" };

  // Check if it's today or more than one day ago
  if (
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCDate() === currentDate.getUTCDate()
  ) {
    // Today: Return date with format mm-dd-yyyy and time with format hh:mm
    const formattedDate = inputDate.toLocaleDateString("vi-VN", dateFormat);
    let formattedTime = inputDate.toLocaleTimeString("vi-VN", timeFormat);
    // Replace AM/PM with Sáng/Chiều hoặc Tối
    formattedTime = formattedTime
      .replace("AM", "Sáng")
      .replace("PM", "Chiều/Tối");
    return `${formattedDate} ${formattedTime}`;
  } else {
    // Not today: Return date with format mm-dd-yyyy
    const formattedDate = inputDate.toLocaleDateString("vi-VN", dateFormat);
    return formattedDate;
  }
};
