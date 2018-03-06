import * as Surplus from "surplus";
// tslint:disable-next-line:no-unused-expression
Surplus; // Expression is a workaround to prevent the module from being dropped ...

import S from "s-js";

const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function Clock() {
  return S(() => {
    const currentDate = S.data<Date>(new Date());
    const formattedDate = S(() => formatDate(currentDate()));

    const intervalId = setInterval(() => {
      currentDate(new Date());
    }, 1000);

    // Clean the interval in case the DOM node is removed.
    // TODO: Check if this is used correctly...
    S.cleanup(() => {
      clearInterval(intervalId);
    });

    return <div>{formattedDate()}</div>;
  });
}
