import { isEmpty } from "lodash";
import { IData, IFetchIngridient, IQuantityOrder } from "./types";

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

export const rangeDate = (dateNow: number, date: number) => {
  if(dateNow === date) {
    return `Сегодня`;
  }else if(1 === (dateNow - date)) {
    return `Вчера`;
  }else {
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

export const showInfoOrder = (wsPicture: string[], BurgerIngredients: IFetchIngridient[], text: string) => {
  const arr: (number | IFetchIngridient | {image: string, len: number})[] = [];

  BurgerIngredients.forEach((element) => {
      wsPicture.find((item) => {
          if(item === element._id) {
              if(text === 'icon') {
                  arr.push({image: element.image, len: wsPicture.length} as {image: string, len: number})
              }else if(text === 'price') {
                  arr.push(element.price  as number)
              }else if(text === 'modal') {
                arr.push(element)
              }
          }
      })
  });

  return arr
}

export const quantityOrder = (count: IFetchIngridient[]): IQuantityOrder[] => {
  const countArr: IQuantityOrder[] = [...count];
  const len = count.length;
  // const amount: IQuantityOrder[] = [];

  for(let i = 0; i<len; i++) {
    let quantity = 0;
    // console.log(Object.assign({}, countArr[i], {quantity}))
    // countArr[i] = Object.assign({}, countArr[i], {quantity})
    countArr[i].quantity = quantity
    countArr.forEach((element: IQuantityOrder, index) => {
      if(countArr[i]._id === element._id) {
        (countArr[i] as any).quantity++
      }
    })
  }

  const amount = countArr.filter((item, index) => {
    console.log(countArr.indexOf(item),item, index)
    return countArr.indexOf(item) === index
  });


  return amount
}