const validateUrl = (url) => {
  const re = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

  return re.test(url);
};

export default validateUrl;
