// 1589760000000

function age(timestamp) {
  const today = new Date();
  const birthDate = new Date(timestamp);

  let age = today.getFullYear() - birthDate.getFullYear();

  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || month === 0) {
    age = age - 1;
  }

  return age;
}
