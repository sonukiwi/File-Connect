import appConfig from "./config.json";

const dateFormatOptions = {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export function get_files_fetch_url(userName, startAfterKey = "") {
  let apiUrl = appConfig.GET_FILES_LAMBDA_URL;
  apiUrl += `?userName=${userName}`;
  if (startAfterKey !== "") {
    apiUrl += `&StartAfterKey=${startAfterKey}`;
  }
  return apiUrl;
}

export function get_file_presigned_download_url(userName, fileName) {
  let apiUrl = appConfig.GET_PRESIGNED_URL_LAMBDA_URL;
  apiUrl += `?userName=${userName}&fileName=${fileName}`;
  return apiUrl;
}

export function get_formatted_date(date) {
  return new Date(date).toLocaleString("en-IN", dateFormatOptions);
}

export function get_formatted_size(sizeInBytes) {
  let sizeString = "";
  if (sizeInBytes < 1024) {
    sizeString = `${sizeInBytes} ${sizeInBytes > 1 ? "Bytes" : "Byte"}`;
  } else if (sizeInBytes < 1024 * 1024) {
    sizeString = `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else {
    sizeString = `${(sizeInBytes / 1024 / 1024).toFixed(2)} MB`;
  }
  return sizeString;
}
