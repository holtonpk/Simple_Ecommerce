export function moneyFormat(value) {
  return value
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    .replace("$", "");
}

export function validateEmail(Email) {
  return Email.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function validatePhone(Phone) {
  return Phone.toLowerCase().match(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
}

export function validateAddress(Address) {}
