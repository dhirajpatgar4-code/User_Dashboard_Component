const formatCurrencyINR = (num) => {
  const number = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return number.format(num);
};

export default formatCurrencyINR;
