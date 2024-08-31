export const config = {
  busaiUrl: 'https://gpt.busai.me/welcome',
  ssoUrl: 'https://sso.busai.me/auth',
  telegramAuthUrl: 'https://oauth.telegram.org/auth?bot_id=7098503440&origin=https%3A%2F%2Fsso.busai.me&request_access=true&return_to=https%3A%2F%2Fsso.busai.me%2Fauth',
  phoneNumber: '339824931',
  cookiesDir: './Cookies', // Thư mục chứa cookie
  cookiesFile: 'cookies_busai_gpt.json', // Tên tệp cookie
  cookiesFilePath: './Cookies/cookies_busai_gpt.json', // Đảm bảo đường dẫn chính xác
  gptUrl: 'https://gpt.busai.me/welcome',
  message: 'Từ "xin chào" trong tiếng anh có nghĩa là gì?',
  chatPointSelector: 'span.font-bold.leading-none.text-black',
  // Add other configuration variables here as needed
};
