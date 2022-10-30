
export function setCookie(name: string, value: any, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1200);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, null, { expires: -1 });
}

const arr = ['дня', 'дней']

export const rangeDate = (dateNow: any, date: any) => {
  if(dateNow === date) {
    return `Сегодня`;
  }else if(1 === (dateNow - date)) {
    return `Вчера`;
  }else if(2 >= (dateNow - date)) {
    return `${(dateNow - date)} дня назад`;
  }
}

export const changeDate = (date: string) => {
  const dateNow = new Date().getUTCDate();
  const d = new Date(date);
  const numberDate = d.getUTCDate();
  const hours = d.getUTCHours() < 10 ? `0${d.getUTCHours()}` : d.getUTCHours();
  const minutes = d.getUTCMinutes() < 10 ? `0${d.getUTCMinutes()}` : d.getUTCMinutes();
  const result  = `${rangeDate(dateNow, numberDate)} ${hours}:${minutes}`;
  return result;
}

export const showInfoOrder = (wsPicture: any, BurgerIngredients: any, text: string) => {
  const arr: any = [];

  BurgerIngredients.forEach((element: any) => {
      wsPicture.find((item: any) => {
          if(item === element._id) {
              if(text === 'icon') {
                  arr.push(element.image)
              }else if(text === 'price') {
                  arr.push(element.price)
              }else if(text === 'modal') {
                  arr.push(element)
              }
          }
      })
  });
  return arr
}